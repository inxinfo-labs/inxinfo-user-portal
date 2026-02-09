import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";
import api from "../../services/api";
import { getApiErrorMessage } from "../../utils/apiError";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function PanditBookingPayment() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await api.get(`/pandit/bookings/${bookingId}`);
        setBooking(response.data?.data);
        setError(null);
      } catch (err) {
        setError(getApiErrorMessage(err, "Failed to load booking"));
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  const handleDummyPayment = async () => {
    if (!booking) return;
    setPaying(true);
    setError(null);
    try {
      await api.post(`/pandit/bookings/${bookingId}/payment/confirm`);
      navigate("/user/pandit/bookings", { replace: true });
    } catch (err) {
      setError(getApiErrorMessage(err, "Dummy payment failed"));
    } finally {
      setPaying(false);
    }
  };

  const handlePayWithRazorpay = async () => {
    if (!booking) return;
    setPaying(true);
    setError(null);
    try {
      const amount = Number(booking.totalAmount) || 0;
      if (amount <= 0) {
        setError("Invalid booking amount");
        setPaying(false);
        return;
      }
      const createRes = await api.post("/payments/create", {
        orderId: `pandit-booking-${bookingId}`,
        amount,
        currency: "INR",
        receipt: `booking-${bookingId}`,
      });
      const data = createRes.data?.data ?? createRes.data;
      const razorpayKeyId = data?.razorpayKeyId;
      const razorpayOrderId = data?.razorpayOrderId;
      if (!razorpayKeyId || !razorpayOrderId) {
        setError(
          "Payment setup failed: missing Razorpay key or order id. " +
            "Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in payment-service and restart."
        );
        setPaying(false);
        return;
      }
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setError("Could not load Razorpay checkout");
        setPaying(false);
        return;
      }
      const options = {
        key: razorpayKeyId,
        amount: Math.round(amount * 100),
        currency: "INR",
        name: "INXINFO Labs",
        description: `PanditJi Booking #${bookingId}`,
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            await api.post("/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            await api.post(`/pandit/bookings/${bookingId}/payment/confirm`);
            navigate("/user/pandit/bookings", { replace: true });
          } catch (err) {
            const msg = err?.response?.data?.message || getApiErrorMessage(err, "Payment verification failed");
            setError(msg);
            console.error("Verify/confirm error:", err?.response?.data ?? err.message);
          } finally {
            setPaying(false);
          }
        },
        prefill: {
          name: booking.userName || "",
        },
        theme: { color: "#0d9488" },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        setError("Payment failed or was cancelled");
        setPaying(false);
      });
      rzp.open();
    } catch (err) {
      const res = err?.response;
      const code = res?.status;
      const backendMsg = res?.data?.message ?? res?.data?.error ?? (typeof res?.data === "string" ? res.data : null);
      if (code === 404 || (backendMsg && String(backendMsg).toLowerCase().includes("no static resource"))) {
        setError("Payment service not available. Use \"Pay with test (dummy)\" below for local testing.");
        setPaying(false);
        return;
      }
      const msg =
        backendMsg ||
        (code === 401 ? "Please log in again to pay." : null) ||
        (code === 500 ? "Payment server error. Check Razorpay keys in payment-service." : null) ||
        getApiErrorMessage(err, "Could not start payment");
      setError(msg);
      console.error("Pandit booking payment error:", res?.status, res?.data ?? err.message);
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error && !booking) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/user/pandit/bookings")}>
          Back to Bookings
        </Button>
      </Box>
    );
  }

  if (booking?.status !== "PENDING") {
    return (
      <Box p={3}>
        <Alert severity="info">
          This booking is already {booking?.status}. No payment required.
        </Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/user/pandit/bookings")}>
          Back to Bookings
        </Button>
      </Box>
    );
  }

  return (
    <Box maxWidth={480} mx="auto" py={3} px={2}>
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Pay for PanditJi Booking
          </Typography>
          <Typography color="text.secondary" variant="body2" gutterBottom>
            Booking #{bookingId} · {booking?.pandit?.name}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography>Amount</Typography>
            <Typography fontWeight="bold">₹{booking?.totalAmount}</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Pay securely via Card, UPI, or Net Banking. You will be redirected to Razorpay checkout.
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 2 }}>
            Payments are received by your Razorpay account. To credit payouts to your UPI (e.g. 7676134553@upi),
            add it in Razorpay Dashboard → Account &amp; Settings → Bank Account / Payouts.
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={paying}
            onClick={handlePayWithRazorpay}
            sx={{
              bgcolor: "#0d9488",
              "&:hover": { bgcolor: "#0f766e" },
              py: 1.5,
            }}
          >
            {paying ? "Opening checkout..." : "Pay with Card / UPI"}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            size="medium"
            disabled={paying}
            onClick={handleDummyPayment}
            sx={{ mt: 2, borderColor: "#0d9488", color: "#0d9488" }}
          >
            Pay with test (dummy) — for local testing
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigate("/user/pandit/bookings")}
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
