import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLocation } from "wouter";

const SignupPage = () => {
  
  const { signUp, isLoading } = useAuth();
  const [,navigate] = useLocation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { elements } = e.currentTarget;

    const email = (elements.namedItem('email') as HTMLInputElement).value;
    const password = (elements.namedItem('password') as HTMLInputElement).value;
    const username = (elements.namedItem('username') as HTMLInputElement).value;

    // TODO: Validar datos usando regex

    try {
      signUp({ email, password, display_name: username });
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="w-[300px] bg-primary flex flex-col gap-2 rounded-lg p-8 mx-auto mt-16" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="username">Nombre de usuario</label>
        <input
          className="h-8 text-sm bg-secondary outline-0 ::placeholder:text-slate-700 rounded-md py-1 px-2"
          type="text"
          name="username"
          id="username"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className="h-8 text-sm bg-secondary outline-0 ::placeholder:text-slate-700 rounded-md py-1 px-2"
          type="email"
          name="email"
          id="email"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          className="h-8 text-sm bg-secondary outline-0 ::placeholder:text-slate-700 rounded-md py-1 px-2"
          type="password"
          name="password"
          id="password"
          required
        />
      </div>

      <button 
        className="relative h-8 bg-accent text-sm rounded-md cursor-pointer py-1 px-2 mt-4" 
        type="submit"
      >
        { isLoading ? 
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div> : 
          'Registrarse' }
      </button>

      <div className="flex flex-col items-center mt-4">
        <p>Ya tienes una cuenta?</p>
        <p 
          className="text-accent text-sm cursor-pointer hover:underline"
          onClick={() => navigate('/login')}
        >
          Inicia sesión
        </p>
      </div>
    </form>
  );
}
 
export default SignupPage;