import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button";

export default function Landing() {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center h-screen items-center">
            <div className="border-2 border-slate-800 bg-gray-600 rounded-lg">
                <Button onClick={() => navigate("/game")}>Join</Button>
            </div>
        </div>
    )
}