import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import backgroundImage from "../assets/background.jpg";

export default function Landing() {
    const navigate = useNavigate();
    return (
        <div className="h-auto">
            <div
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',   // Ensures the image covers the whole div
                    backgroundPosition: 'center', // Centers the image
                    backgroundRepeat: 'no-repeat', // Prevents image repetition
                    minHeight: '100vh',           // Sets height to full viewport height
                    width: '100%',             // Sets width to full container width
                }}
                className="min-h-screen bg-cover bg-center"
            >
                <div
                    className="border-red-500 border-2 absolute p-4 bg-white"
                    style={{ top: '10%', left: '50%', transform: 'translate(-50%, -50%)' }}
                >
                    <Button onClick={() => navigate('/game')}>Join the Arena</Button>
                </div>
            </div>
        </div>
    );
}
