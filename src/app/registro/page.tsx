'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Download, Mail, User, Shield, FileText, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Section, SectionHeader } from '@/components/shared/section';
import { ProgressIndicator } from '@/components/shared/progress-indicator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAppStore } from '@/store/app-store';
import { z } from 'zod';
import { pageMetadata } from '@/lib/metadata';

// Export metadata for this page

// Form validation schema
const registrationSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(50, 'El nombre no puede exceder 50 caracteres'),
  email: z.string().email('Por favor, ingresa un correo electrónico válido'),
  consent: z.boolean().refine(val => val === true, 'Debes aceptar los términos y condiciones'),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;
type FormErrors = Partial<Record<keyof RegistrationFormData, string>>;

export default function RegistrationPage() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [showExportOptions, setShowExportOptions] = useState(false);
  
  const { ui, registrations, addRegistration, exportRegistrations } = useAppStore();

  // Check if user has already registered
  const hasRegistered = ui.hasRegistered;

  // Handle form input changes
  const handleInputChange = (field: keyof RegistrationFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    try {
      registrationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};
        error.issues.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof RegistrationFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await addRegistration(formData);
      setSubmitStatus('success');
      setSubmitMessage('¡Registro exitoso! Gracias por unirte a nuestra comunidad.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        consent: false,
      });
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(error instanceof Error ? error.message : 'Ocurrió un error durante el registro.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle CSV export
  const handleExportCSV = async () => {
    try {
      const csvContent = await exportRegistrations();
      if (!csvContent) {
        setSubmitStatus('error');
        setSubmitMessage('No hay datos para exportar.');
        return;
      }

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `registros_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setSubmitStatus('success');
      setSubmitMessage('Datos exportados exitosamente.');
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Error al exportar los datos.');
    }
  };

  // Auto-hide success/error messages
  useEffect(() => {
    if (submitStatus !== 'idle') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  if (hasRegistered) {
    return (
      <div className="min-h-screen bg-background">
        <ProgressIndicator position="top" showPercentage={false} />
        <Navbar />

        <Section className="pt-32 pb-16">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                ¡Ya estás Registrado!
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Gracias por ser parte de nuestra comunidad. Tu registro ha sido guardado exitosamente.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setShowExportOptions(!showExportOptions)}
                  variant="outline"
                  className="text-lg px-8 py-4"
                >
                  <Download className="h-5 w-5 mr-2" />
                  {showExportOptions ? 'Ocultar Opciones' : 'Ver Opciones'}
                </Button>
                
                <Button
                  onClick={() => window.location.href = '/'}
                  className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white text-lg px-8 py-4"
                >
                  Volver al Inicio
                </Button>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Export Options */}
        {showExportOptions && (
          <Section>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Opciones de Exportación
                </CardTitle>
                <CardDescription>
                  Gestiona los datos de registro guardados localmente.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Total de Registros</p>
                    <p className="text-sm text-muted-foreground">
                      {registrations.length} {registrations.length === 1 ? 'registro' : 'registros'} guardados
                    </p>
                  </div>
                  <Button onClick={handleExportCSV} disabled={registrations.length === 0}>
                    <Download className="h-4 w-4 mr-2" />
                    Exportar CSV
                  </Button>
                </div>
                
                {registrations.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Registros Recientes:</h4>
                    <div className="max-h-40 overflow-y-auto space-y-2">
                      {registrations.slice(-5).reverse().map((reg) => (
                        <div key={reg.id} className="flex items-center justify-between p-2 border rounded text-sm">
                          <div>
                            <span className="font-medium">{reg.name}</span>
                            <span className="text-muted-foreground ml-2">({reg.email})</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(reg.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Section>
        )}

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ProgressIndicator position="top" showPercentage={false} />
      <Navbar />

      {/* Hero Section */}
      <Section className="pt-32 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="block">Únete a Nuestra</span>
              <span className="block bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Comunidad
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Regístrate para recibir las últimas actualizaciones y contenido exclusivo
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Registration Form */}
      <Section>
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
                <CardDescription>
                  Completa el formulario para unirte a nuestra comunidad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Juan Pérez"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="juan@ejemplo.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => handleInputChange('consent', checked as boolean)}
                        disabled={isSubmitting}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="consent"
                          className="text-sm font-normal leading-relaxed"
                        >
                          Acepto los{' '}
                          <a href="/terminos" className="text-brand-primary hover:underline">
                            términos y condiciones
                          </a>{' '}
                          y la{' '}
                          <a href="/privacidad" className="text-brand-primary hover:underline">
                            política de privacidad
                          </a>
                        </Label>
                      </div>
                    </div>
                    {errors.consent && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Registrando...
                      </>
                    ) : (
                      'Registrarse Ahora'
                    )}
                  </Button>
                </form>

                {/* Status Messages */}
                {submitStatus !== 'idle' && (
                  <Alert className={`mt-4 ${submitStatus === 'success' ? 'border-green-500' : 'border-red-500'}`}>
                    {submitStatus === 'success' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    <AlertTitle>
                      {submitStatus === 'success' ? 'Éxito' : 'Error'}
                    </AlertTitle>
                    <AlertDescription>{submitMessage}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Features Section */}
      <Section background="muted">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="¿Qué Obtienes al Registrarte?"
            subtitle="Beneficios Exclusivos"
            description="Accede a contenido y ventajas diseñadas especialmente para nuestra comunidad."
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              {
                title: "Contenido Exclusivo",
                description: "Acceso a artículos, tutoriales y recursos no disponibles públicamente.",
                icon: "📚"
              },
              {
                title: "Actualizaciones Primeras",
                description: "Sé el primero en conocer nuestras nuevas características y lanzamientos.",
                icon: "🚀"
              },
              {
                title: "Comunidad Privada",
                description: "Únete a discusiones con otros profesionales y expertos de la industria.",
                icon: "👥"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-lg p-6 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Security Note */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-muted-foreground"
          >
            <Shield className="h-5 w-5" />
            <span>Tus datos están seguros con nosotros. Utilizamos almacenamiento local y cifrado para proteger tu información.</span>
          </motion.div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}