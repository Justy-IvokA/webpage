'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Lightbulb, Target, Award, Clock } from 'lucide-react';
import { AnimationProvider } from '@/components/shared/animation-provider';

export default function AboutPage() {
  const { t } = useTranslation();

  const values = [
    {
      icon: Lightbulb,
      title: t('about.values.innovation'),
      description: 'Innovation'
    },
    {
      icon: Users,
      title: t('about.values.creativity'),
      description: 'Creativity'
    },
    {
      icon: Target,
      title: t('about.values.excellence'),
      description: 'Excellence'
    },
    {
      icon: Award,
      title: t('about.values.collaboration'),
      description: 'Collaboration'
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Fundación',
      description: 'Ivoka nació de la convicción de que la tecnología debe servir a la humanidad'
    },
    {
      year: '2021',
      title: 'Primera Comunidad',
      description: 'Formamos nuestra comunidad inicial de visionarios apasionados por la IA y el desarrollo humano'
    },
    {
      year: '2022',
      title: 'Expansión',
      description: 'Crecimos para incluir expertos en IA, desarrollo humano y finanzas personales'
    },
    {
      year: '2023',
      title: 'Reconocimiento',
      description: 'Nos convertimos en la comunidad líder en el mundo hispanohablante sobre IA y desarrollo humano'
    },
    {
      year: '2024',
      title: 'Impacto Global',
      description: 'Expandidos a múltiples países, transformando vidas a través de la educación en IA'
    }
  ];

  return (
    <AnimationProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-brand-secondary/5 to-transparent" />
          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge variant="secondary" className="mb-4">
                {t('about.title')}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                {t('about.subtitle')}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t('about.mission.content')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-brand-primary/5 to-transparent">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Target className="h-6 w-6 text-brand-primary" />
                      {t('about.mission.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('about.mission.content')}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-brand-secondary/5 to-transparent">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Lightbulb className="h-6 w-6 text-brand-secondary" />
                      {t('about.vision.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('about.vision.content')}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('about.values.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Los principios fundamentales que guían todo lo que hacemos
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.description}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                        <value.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-lg">{value.description}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {value.title}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('about.history.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('about.history.content')}
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-brand-primary to-brand-secondary" />
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } flex-col gap-8`}
                  >
                    <div className="md:w-1/2">
                      <Card className="border-0 shadow-lg">
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-brand-primary" />
                            <Badge variant="outline">{item.year}</Badge>
                          </div>
                          <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="md:w-1/2 flex justify-center">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary border-4 border-background shadow-lg" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('about.team.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('about.team.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="max-w-2xl mx-auto border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Únete a Nuestro Equipo</h3>
                  <p className="text-muted-foreground mb-6">
                    Siempre estamos buscando personas talentosas que compartan nuestra pasión por la innovación y la excelencia en IA y desarrollo humano.
                  </p>
                  <Button className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white">
                    Ver Posiciones Abiertas
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="max-w-4xl mx-auto border-0 shadow-xl bg-gradient-to-br from-brand-primary to-brand-secondary text-white">
                <CardContent className="p-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    ¿Listo para Trabajar Con Nosotros?
                  </h2>
                  <p className="text-lg mb-8 opacity-90">
                    Creemos algo extraordinario juntos. Ponte en contacto con nuestro equipo para discutir tu próximo proyecto.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="secondary" size="lg" className="text-brand-primary">
                      Contáctanos
                    </Button>
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-primary">
                      Ver Nuestro Trabajo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </AnimationProvider>
  );
}