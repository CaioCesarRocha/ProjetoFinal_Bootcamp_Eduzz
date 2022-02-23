import AppRoutes from "./routes/App.routes";
import AuthRoutes from "./routes/Auth.routes";
import useAuth from "./hooks/authHooks";




function App(){
  const { signed } = useAuth();

  return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default App;
