import React, {useState} from 'react';
import { useAuthstore } from '../store/useAuthstore';
import { EyeOff, KeyRound, Mail, MessageSquare, Eye, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import toast from 'react-hot-toast';


const SignUp = () => {

    const [showPassword, setshowPassword] = useState(false);
    const [data, setdata] = useState({
        email:"",
        password:"",
    });

    const { is_login, login } = useAuthstore();
    const validate_form = () => {
        if (!data.email.trim()) return toast.error("Email required!");
        if (!/\S+@\S+\.\S+/.test(data.email)) return toast.error("Invalid email format");
        if (!data.password) return toast.error("Password required!");
        if (data.password.length<8) return toast.error("Password must be at least 8 characters!");

        return true;
    };

    const handle_submit = (e) => {
        e.preventDefault();

        const success = validate_form();

        if (success===true)
            login(data);
    };

  return (
    <div className="min-h-screen grid lg: grid-cols-2">
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">
                {/*Logo*/}
                
                
                <div className="flex-center mb-8">
                    <div className="flex flex-col items-center gap-2 group">
                        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <MessageSquare className="size-6 text-primary"/>
                        </div>
                        <h1 className="text-2xl font-bold mt-2">Login</h1>
                        <p className="text-base-content/60">Welcome to chat-app</p>
                    </div>
                </div>
                
                
                <form onSubmit={handle_submit} className="space-y-6">
                    <div className="font-control">
                        <label className="label">
                            <span className="label-text font-medium">Email</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="size-5 text-base-content/40"/>
                            </div>
                            <input
                            type="text"
                            className={`input input-bordered w-full pl-10`}
                            placeholder="Your email"
                            value={data.email}
                            onChange={(e) => setdata({...data, email:e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="font-control">
                        <label className="label">
                            <span className="label-text font-medium">Password</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <KeyRound className="size-5 text-base-content/40"/>
                            </div>
                            <input
                            type={showPassword ? "text" : "password"}
                            className={`input input-bordered w-full pl-10`}
                            placeholder="••••••••"
                            value={data.password}
                            onChange={(e) => setdata({...data, password:e.target.value})}
                            />
                            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => {
                                setshowPassword(!showPassword);}}>
                                    {showPassword ? (
                                        <EyeOff className="size-5 text-base-content/40" />) : (<Eye className="size-5 text-base-content/40" />)}
                            </button>
                        </div>
                    </div>
                    
                    
                    <div className="flex w-full flex-col">
                        <div className="divider">
                            <button type="submit" className="btn btn-wide cursor-pointer bg-primary/20" disabled={is_login}>
                            {is_login ? (<><Loader2 className="size-5 animate-spin"/>Loading...</>):("Log in")}
                            </button>
                        </div>
                    </div>
                        
                </form>

                
                <div className="text-center">
                    <p className="text-base-content/60">
                        Haven't got an account? {" "}
                        <Link to="/signup" className="link link-primary">
                        Signup
                        </Link>
                    </p>
                </div>
            </div>        
        </div>


        <AuthImagePattern title="Join our community" subtitle="Connect with people from all over the world!"/>   
    </div>
  );
};

export default SignUp;