import { Prisma } from '../src/config/db/prisma';

async function main() {
  await Prisma.areaType.createMany({
    data: [
      { label: 'Sala', icon: 'living', color: '#EDDDDF' },
      { label: 'Habitación', icon: 'bed', color: '#6831DD' },
      { label: 'Oficina', icon: 'work-outline', color: '#D6EBF2' },
      { label: 'Cocina', icon: 'kitchen', color: '#ffb3ba' },
      { label: 'Baño', icon: 'bathroom', color: '#c9c9ff' },
      { label: 'Jardín', icon: 'forest', color: '#baffc9' },
      { label: 'Patio', icon: 'forest', color: '#f5f5f5' },
      { label: 'Zona exterior', icon: 'deck', color: '#bfbfbf' },
      { label: 'Garaje', icon: 'garage', color: '#ffdfba' },
      { label: 'Sótano', icon: 'basement', color: '#f5f5f5' },
      { label: 'Desván', icon: 'attic', color: '#f5f5f5' },
      { label: 'Cuarto de lavado', icon: 'laundry', color: '#f5f5f5' },
      { label: 'Cuarto de herramientas', icon: 'tools', color: '#f5f5f5' },
      { label: 'Cuarto de juegos', icon: 'games', color: '#f5f5f5' },
    ],
  });

  await Prisma.controllerType.createMany({
    data: [
      { key: 'arduino', label: 'Arduino' },
      { key: 'esp-8266', label: 'ESP8266' },
      { key: 'esp-32', label: 'ESP32' },
      { key: 'esp-32-s', label: 'ESP32-S' },
      { key: 'esp-32-cam', label: 'ESP32-CAM' },
      { key: 'raspberry-pi', label: 'Raspberry PI' },
      { key: 'raspberry-pi-zero', label: 'Raspberry PI Zero' },
      { key: 'raspberry-pi-pico', label: 'Raspberry PI Pico' },
      { key: 'raspberry-pi-cm', label: 'Raspberry PI Compute Module' },
      { key: 'raspberry-pi-cm-3', label: 'Raspberry PI Compute Module 3' },
      { key: 'raspberry-pi-cm-4', label: 'Raspberry PI Compute Module 4' },
    ],
  });

  const devicesTypes = [
    { key: 'switch', label: 'Switch' },
    { key: 'connector', label: 'Connector' },
    { key: 'dimmer', label: 'Dimmer' },
    { key: 'relay', label: 'Relé' },
    { key: 'sensor', label: 'Sensor' },
    { key: 'motor', label: 'Motor DC' },
    { key: 'servo', label: 'Servomotor' },
    { key: 'temperature', label: 'Sensor de temperatura' },
    { key: 'humidity', label: 'Sensor de humedad' },
    { key: 'light', label: 'Sensor de luz' },
    { key: 'motion', label: 'Sensor de movimiento' },
    { key: 'distance', label: 'Sensor de distancia' },
    { key: 'gas', label: 'Sensor de gas' },
    { key: 'sound', label: 'Sensor de sonido' },
    { key: 'pressure', label: 'Sensor de presión' },
    { key: 'current', label: 'Sensor de corriente' },
    { key: 'voltage', label: 'Sensor de voltaje' },
    { key: 'power', label: 'Sensor de potencia' },
    { key: 'speaker', label: 'Altavoz' },
    { key: 'display', label: 'Pantalla' },
    { key: 'led', label: 'LED' },
    { key: 'led-matrix', label: 'Matriz de LED' },
    { key: 'rgb-led', label: 'LED RGB' },
    { key: 'rgb-strip', label: 'Tira de LED RGB' },
  ].sort((a, b) => a.label.localeCompare(b.key));

  await Prisma.deviceType.createMany({
    data: [...devicesTypes],
  });
}
main()
  .then(async () => await Prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await Prisma.$disconnect();
    process.exit(1);
  });
