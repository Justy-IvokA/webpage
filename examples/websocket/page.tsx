import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SocketDemo() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Real-time Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            La demo de Socket.IO fue retirada como parte de la simplificación del proyecto.
            Puedes reutilizar esta ruta para otras demostraciones o eliminarla si ya no es necesaria.
          </p>
          <p className="text-gray-500 text-sm">
            Si necesitas comunicación en tiempo real en el futuro, considera integrar tecnologías como WebSockets o Server-Sent Events según los requisitos del proyecto.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
