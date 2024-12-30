import { Button } from "react-bootstrap"
import authServices from '../Services/authApi';
import { useEffect, useState } from "react";


function TwoFASetup({ onSetupComplete }) {
  const [response, setResponse] = useState({});
  const [message, setMessage] = useState("");
  
  const fetchQRCode = async () => {
    const {data} = await authServices.setup2FA(); 
    console.log(data);
    setResponse(data);
  }

  useEffect(() => {
    fetchQRCode();
  }, [])

  const copyClipBoard = async () => {
    await navigator.clipboard.writeText(response.secret);
    setMessage("Secret copied to clipboard");
  }

  return (
    <div className="loginFormContainer">
      <h2>
        Turn on 2FA verification
      </h2>
      <hr />
      <p>Scan the QR code below with your authenticator app</p>
      <div className="flex justify-center">
        <img src={response.qrCode} alt="2FA QR COde" className="mb-4 border rounded-md" />
      </div>
      <div className="flex items-center mt-3 mb-3">
        <div className="border-t border-1 flex-grow">
          {message && <p>{message}</p>}
          <input 
          type="text"
          readOnly
          value=""
          onClick={copyClipBoard}
          />
        </div>
        <Button onClick={onSetupComplete} variant="primary" style={{marginTop: 10}}>Continue to verification</Button>
      </div>

    </div>
  )
}

export default TwoFASetup