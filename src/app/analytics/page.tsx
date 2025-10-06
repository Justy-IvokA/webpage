'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, BarChart3, Download, RefreshCw } from 'lucide-react';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Section, SectionHeader } from '@/components/shared/section';
import { ProgressIndicator } from '@/components/shared/progress-indicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { pageMetadata } from '@/lib/metadata';

// Export metadata for this page

// Mock data for charts
const revenueData = [
  { month: 'Ene', revenue: 45000, target: 40000 },
  { month: 'Feb', revenue: 52000, target: 45000 },
  { month: 'Mar', revenue: 48000, target: 50000 },
  { month: 'Abr', revenue: 61000, target: 55000 },
  { month: 'May', revenue: 58000, target: 60000 },
  { month: 'Jun', revenue: 67000, target: 65000 },
  { month: 'Jul', revenue: 72000, target: 70000 },
  { month: 'Ago', revenue: 69000, target: 75000 },
  { month: 'Sep', revenue: 78000, target: 80000 },
  { month: 'Oct', revenue: 82000, target: 85000 },
  { month: 'Nov', revenue: 89000, target: 90000 },
  { month: 'Dic', revenue: 95000, target: 95000 },
];

const userRegistrationData = [
  { week: 'Sem 1', registrations: 45, target: 40 },
  { week: 'Sem 2', registrations: 52, target: 45 },
  { week: 'Sem 3', registrations: 38, target: 50 },
  { week: 'Sem 4', registrations: 67, target: 55 },
  { week: 'Sem 5', registrations: 74, target: 60 },
  { week: 'Sem 6', registrations: 81, target: 65 },
  { week: 'Sem 7', registrations: 69, target: 70 },
  { week: 'Sem 8', registrations: 92, target: 75 },
  { week: 'Sem 9', registrations: 88, target: 80 },
  { week: 'Sem 10', registrations: 95, target: 85 },
  { week: 'Sem 11', registrations: 103, target: 90 },
  { week: 'Sem 12', registrations: 112, target: 95 },
];

const retentionData = [
  { month: 'Ene', newUsers: 100, retained: 85, churned: 15 },
  { month: 'Feb', newUsers: 120, retained: 98, churned: 22 },
  { month: 'Mar', newUsers: 95, retained: 82, churned: 13 },
  { month: 'Abr', newUsers: 140, retained: 118, churned: 22 },
  { month: 'May', newUsers: 110, retained: 94, churned: 16 },
  { month: 'Jun', newUsers: 160, retained: 136, churned: 24 },
  { month: 'Jul', newUsers: 130, retained: 110, churned: 20 },
  { month: 'Ago', newUsers: 145, retained: 123, churned: 22 },
  { month: 'Sep', newUsers: 155, retained: 132, churned: 23 },
  { month: 'Oct', newUsers: 170, retained: 144, churned: 26 },
  { month: 'Nov', newUsers: 185, retained: 157, churned: 28 },
  { month: 'Dic', newUsers: 200, retained: 170, churned: 30 },
];

const deviceData = [
  { name: 'Desktop', value: 45, color: '#0062FF' },
  { name: 'Mobile', value: 35, color: '#7964F2' },
  { name: 'Tablet', value: 20, color: '#B9CA19' },
];

const COLORS = ['#0062FF', '#7964F2', '#B9CA19', '#FE7734'];

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  format?: 'currency' | 'percentage' | 'number';
}

function MetricCard({ title, value, change, icon, format = 'number' }: MetricCardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'currency':
        return `$${val.toLocaleString()}`;
      case 'percentage':
        return `${val}%`;
      default:
        return val.toLocaleString();
    }
  };

  const isPositive = change >= 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatValue(value)}</div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          {isPositive ? (
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
          )}
          <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className="ml-1">vs mes anterior</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('year');
  const [isLoading, setIsLoading] = useState(false);

  // Calculate metrics
  const metrics = useMemo(() => {
    const currentRevenue = revenueData[revenueData.length - 1].revenue;
    const previousRevenue = revenueData[revenueData.length - 2].revenue;
    const revenueChange = ((currentRevenue - previousRevenue) / previousRevenue) * 100;

    const currentUsers = userRegistrationData[userRegistrationData.length - 1].registrations;
    const previousUsers = userRegistrationData[userRegistrationData.length - 2].registrations;
    const usersChange = ((currentUsers - previousUsers) / previousUsers) * 100;

    const totalUsers = retentionData.reduce((sum, month) => sum + month.newUsers, 0);
    const totalRetained = retentionData.reduce((sum, month) => sum + month.retained, 0);
    const retentionRate = (totalRetained / totalUsers) * 100;
    const previousRetentionRate = 85.5;
    const retentionChange = retentionRate - previousRetentionRate;

    const avgSessionDuration = 4.2; // minutes
    const previousAvgSession = 3.8;
    const sessionChange = ((avgSessionDuration - previousAvgSession) / previousAvgSession) * 100;

    return {
      revenue: { value: currentRevenue, change: revenueChange },
      users: { value: currentUsers, change: usersChange },
      retention: { value: retentionRate.toFixed(1), change: retentionChange },
      sessions: { value: avgSessionDuration, change: sessionChange },
    };
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleExport = () => {
    // In a real app, this would export the actual data
    const dataStr = JSON.stringify({ revenueData, userRegistrationData, retentionData }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressIndicator position="top" showPercentage={false} />
      <Navbar />

      {/* Hero Section */}
      <Section className="pt-32 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 max-w-7xl mx-auto">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="block">Analytics y</span>
                <span className="block bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  Métricas
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Visualiza el rendimiento y el crecimiento de tu negocio en tiempo real
              </p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex gap-2"
          >
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Actualizar
            </Button>
            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </motion.div>
        </div>
      </Section>

      {/* Metrics Overview */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <MetricCard
              title="Ingresos"
              value={metrics.revenue.value}
              change={metrics.revenue.change}
              icon={<DollarSign className="h-4 w-4" />}
              format="currency"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MetricCard
              title="Usuarios Registrados"
              value={metrics.users.value}
              change={metrics.users.change}
              icon={<Users className="h-4 w-4" />}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MetricCard
              title="Tasa de Retención"
              value={metrics.retention.value}
              change={metrics.retention.change}
              icon={<Activity className="h-4 w-4" />}
              format="percentage"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MetricCard
              title="Duración Promedio"
              value={metrics.sessions.value}
              change={metrics.sessions.change}
              icon={<BarChart3 className="h-4 w-4" />}
            />
          </motion.div>
        </div>
      </Section>

      {/* Charts Section */}
      <Section background="muted">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Análisis Detallado"
            subtitle="Visualizaciones Interactivas"
            description="Explora los datos a través de diferentes tipos de gráficos y periodos."
            align="center"
          />

          <Tabs defaultValue="revenue" className="mt-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="revenue">Ingresos</TabsTrigger>
              <TabsTrigger value="users">Usuarios</TabsTrigger>
              <TabsTrigger value="retention">Retención</TabsTrigger>
              <TabsTrigger value="devices">Dispositivos</TabsTrigger>
            </TabsList>

            <TabsContent value="revenue" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tendencia de Ingresos</CardTitle>
                  <CardDescription>
                    Evolución de los ingresos mensuales vs objetivos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                        labelFormatter={(label) => `Mes: ${label}`}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#0062FF"
                        strokeWidth={3}
                        dot={{ fill: '#0062FF', strokeWidth: 2, r: 4 }}
                        name="Ingresos Reales"
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#7964F2"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: '#7964F2', strokeWidth: 2, r: 4 }}
                        name="Objetivo"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Registros de Usuarios</CardTitle>
                  <CardDescription>
                    Nuevos registros semanales y comparación con objetivos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={userRegistrationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => [value, 'Usuarios']}
                        labelFormatter={(label) => `Semana: ${label}`}
                      />
                      <Legend />
                      <Bar
                        dataKey="registrations"
                        fill="#0062FF"
                        name="Registros"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="target"
                        fill="#B9CA19"
                        name="Objetivo"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="retention" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Análisis de Retención</CardTitle>
                  <CardDescription>
                    Nuevos usuarios, usuarios retenidos y tasa de abandono
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={retentionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => [value, 'Usuarios']}
                        labelFormatter={(label) => `Mes: ${label}`}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="newUsers"
                        stackId="1"
                        stroke="#0062FF"
                        fill="#0062FF"
                        fillOpacity={0.6}
                        name="Nuevos Usuarios"
                      />
                      <Area
                        type="monotone"
                        dataKey="retained"
                        stackId="1"
                        stroke="#7964F2"
                        fill="#7964F2"
                        fillOpacity={0.6}
                        name="Usuarios Retenidos"
                      />
                      <Area
                        type="monotone"
                        dataKey="churned"
                        stackId="1"
                        stroke="#FE7734"
                        fill="#FE7734"
                        fillOpacity={0.6}
                        name="Usuarios Perdidos"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="devices" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Dispositivos</CardTitle>
                  <CardDescription>
                    Porcentaje de usuarios por tipo de dispositivo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <ResponsiveContainer width="100%" height={300} className="lg:w-1/2">
                      <PieChart>
                        <Pie
                          data={deviceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {deviceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`${value}%`, 'Porcentaje']} />
                      </PieChart>
                    </ResponsiveContainer>
                    
                    <div className="lg:w-1/2 space-y-4">
                      {deviceData.map((device, index) => (
                        <div key={device.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: COLORS[index] }}
                            />
                            <span className="font-medium">{device.name}</span>
                          </div>
                          <span className="text-lg font-bold">{device.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Section>

      {/* Key Insights */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Conclusiones Clave"
            subtitle="Insights Importantes"
            description="Observaciones y recomendaciones basadas en los datos analizados."
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[
              {
                title: "Crecimiento Sostenido",
                description: "Los ingresos muestran una tendencia positiva constante, superando los objetivos en la mayoría de los meses.",
                trend: "positive"
              },
              {
                title: "Adopción Móvil",
                description: "El 35% de los usuarios acceden desde dispositivos móviles, indicando la importancia de la optimización mobile.",
                trend: "neutral"
              },
              {
                title: "Alta Retención",
                description: "La tasa de retención del 87.3% demuestra la satisfacción de los usuarios con el servicio.",
                trend: "positive"
              },
              {
                title: "Oportunidad de Mejora",
                description: "Las semanas 3 y 7 muestran menor registro, sugiriendo la necesidad de campañas específicas.",
                trend: "negative"
              }
            ].map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    insight.trend === 'positive' ? 'bg-green-500' :
                    insight.trend === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                  <div>
                    <h3 className="font-semibold mb-2">{insight.title}</h3>
                    <p className="text-muted-foreground text-sm">{insight.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}