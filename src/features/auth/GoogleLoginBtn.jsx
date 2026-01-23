import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginBtn() {
  return (
    <GoogleLogin
      onSuccess={(res) => console.log(res)}
      onError={() => alert("Google Login Failed")}
    />
  );
}
