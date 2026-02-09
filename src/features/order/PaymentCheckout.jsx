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

export default function PaymentCheckout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${id}`);
        setOrder(response.data?.data);
        setError(null);
      } catch (err) {
        setError(getApiErrorMessage(err, "Failed to load order"));
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleDummyPayment = async () => {
    if (!order) return;
    setPaying(true);
    setError(null);
    try {
      await api.post(`/orders/${id}/payment/confirm`, { paymentId: "DUMMY-TEST-" + Date.now() });
      navigate(`/user/order/${id}`, { replace: true });
    } catch (err) {
      setError(getApiErrorMessage(err, "Dummy payment failed"));
    } finally {
      setPaying(false);
    }
  };

  const handlePayWithRazorpay = async () => {
    if (!order) return;
    setPaying(true);
    setError(null);
    try {
      const amount = Number(order.totalAmount) || 0;
      if (amount <= 0) {
        setError("Invalid order amount");
        setPaying(false);
        return;
      }
      const createRes = await api.post("/payments/create", {
        orderId: order.orderNumber || String(order.id),
        amount,
        currency: "INR",
      });
      const data = createRes.data?.data ?? createRes.data;
      const razorpayKeyId = data?.razorpayKeyId;
      const razorpayOrderId = data?.razorpayOrderId;
      if (!razorpayKeyId || !razorpayOrderId) {
        setError("Payment setup failed: missing key or order id");
        setPaying(false);
        return;
      }
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setError("Could not load Razorpay checkout");
        setPaying(false);
        return;
      }
      const amountPaise = Math.round(amount * 100);
      const options = {
        key: razorpayKeyId,
        amount: amountPaise,
        currency: "INR",
        name: "INXINFO Labs",
        description: `Order ${order.orderNumber}`,
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            await api.post("/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            await api.post(`/orders/${id}/payment/confirm`, {
              paymentId: response.razorpay_payment_id,
            });
            navigate(`/user/order/${id}`, { replace: true });
            window.location.reload();
          } catch (err) {
            setError(getApiErrorMessage(err, "Payment verification failed"));
          } finally {
            setPaying(false);
          }
        },
        prefill: {
          name: order.userName || "",
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
      const backendMsg = res?.data?.message ?? res?.data?.error;
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
      console.error("Order payment error:", res?.status, res?.data ?? err.message);
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

  if (error && !order) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/user/order")}>
          Back to Orders
        </Button>
      </Box>
    );
  }

  return (
    <Box maxWidth={480} mx="auto" py={3} px={2}>
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Complete Payment
          </Typography>
          <Typography color="text.secondary" variant="body2" gutterBottom>
            Order #{order?.orderNumber}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography>Amount</Typography>
            <Typography fontWeight="bold">₹{order?.totalAmount}</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Pay securely via Card, UPI, or Net Banking. You will be redirected to Razorpay checkout.
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 2 }}>
            Local testing: use Razorpay test keys and test UPI ID (e.g. success@razorpay) or test card 4111 1111 1111 1111.
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
          <Button fullWidth variant="outlined" sx={{ mt: 2 }} onClick={() => navigate(`/user/order/${id}`)}>
            Cancel
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
