
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", loginForm);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup attempt:", signupForm);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Área de Membros</h1>
            <p className="text-muted-foreground">
              Acesse sua conta ou cadastre-se para fazer parte da nossa comunidade
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Cadastrar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Fazer Login</CardTitle>
                  <CardDescription>
                    Entre com suas credenciais para acessar a área de membros
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label htmlFor="loginEmail" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="loginEmail"
                        type="email"
                        placeholder="seu@email.com"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="loginPassword" className="block text-sm font-medium mb-2">
                        Senha
                      </label>
                      <Input
                        id="loginPassword"
                        type="password"
                        placeholder="Sua senha"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Entrar
                    </Button>
                    
                    <div className="text-center">
                      <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                        Esqueceu sua senha?
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Criar Conta</CardTitle>
                  <CardDescription>
                    Preencha os dados abaixo para se cadastrar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                          Nome
                        </label>
                        <Input
                          id="firstName"
                          placeholder="Nome"
                          value={signupForm.firstName}
                          onChange={(e) => setSignupForm({...signupForm, firstName: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                          Sobrenome
                        </label>
                        <Input
                          id="lastName"
                          placeholder="Sobrenome"
                          value={signupForm.lastName}
                          onChange={(e) => setSignupForm({...signupForm, lastName: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="signupEmail" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="seu@email.com"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="signupPassword" className="block text-sm font-medium mb-2">
                        Senha
                      </label>
                      <Input
                        id="signupPassword"
                        type="password"
                        placeholder="Crie uma senha"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                        Confirmar Senha
                      </label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirme sua senha"
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Criar Conta
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Ao se cadastrar, você concorda com nossos{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Termos de Uso
              </Link>{" "}
              e{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Política de Privacidade
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
