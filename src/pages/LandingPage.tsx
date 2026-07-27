import { Hero } from '@/components/marketing/Hero'
import { FeatureSection } from '@/components/marketing/FeatureSection'
import { CatalogPreview } from '@/components/marketing/CatalogPreview'
import { Manifesto } from '@/components/marketing/Manifesto'
import { FinalCta } from '@/components/marketing/FinalCta'
import { Footer } from '@/components/marketing/Footer'

export function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col bg-void">
      <Hero />

      <FeatureSection
        id="catalogo"
        surface="obsidian"
        kicker="El catálogo"
        headline="Un punto de partida que ya hemos investigado por ti"
        description="29 referencias de Rioja, Ribera del Duero y Priorat, cada una con un precio de mercado estimado, un rango y las fuentes que usamos para llegar a él — no hay caja negra."
        image="/media/cellar-barrels.jpg"
        imageAlt="Cava de vino con barricas apiladas bajo luz tenue"
        imageCaption="Catálogo investigado manualmente, no scrapeado"
        subFeatures={[
          {
            title: '29 referencias, tres regiones',
            description:
              'De vinos de entrada de ~20€ a iconos como Vega Sicilia o L\'Ermita — el catálogo cubre todo el rango, no solo lo excepcional.',
          },
          {
            title: 'Precio, rango y fuente citada',
            description:
              'Cada vino muestra de dónde sale la estimación: retailers, comparadores de precio o comps de reventa — nunca un número sin origen.',
          },
          {
            title: 'Crece con cada coleccionista',
            description:
              'El catálogo es el punto de partida, no el límite — si tu botella no está, la añades a mano y queda registrada igual.',
          },
        ]}
      />

      <CatalogPreview />

      <FeatureSection
        id="como-funciona"
        reverse
        kicker="Tu colección"
        headline="De la botella al valor, en menos de un minuto"
        description="Busca tu vino en el catálogo o añádelo a mano, indica cuántas botellas tienes y en qué condición están, y tu colección queda registrada — lista para consultar cuando quieras."
        image="/media/bottles-shelf.jpg"
        imageAlt="Botellas de vino ordenadas en una estantería de bodega"
        imageCaption="Tu colección, no la nuestra"
        subFeatures={[
          {
            title: 'Busca o añade a mano',
            description:
              'Si el vino está en el catálogo, lo seleccionas y listo. Si no, lo registras manualmente — sin bloquear tu inventario por un vino raro.',
          },
          {
            title: 'Cantidad, añada y condición',
            description:
              'Cada botella lleva su propio detalle: cuántas tienes, de qué año y en qué estado — la base para un valor honesto, no genérico.',
          },
          {
            title: 'Un panel, no una hoja de cálculo',
            description:
              'Valor total, desglose por región y distribución de confianza — todo en un dashboard que se actualiza solo con lo que registras.',
          },
        ]}
      />

      <FeatureSection
        surface="obsidian"
        kicker="Confianza"
        headline="No todas las valoraciones merecen la misma seguridad"
        description="Vega Sicilia y Pingus tienen mercado secundario real y comps verificables. La mayoría del vino español, no. Acervo lo dice claramente en vez de fingir precisión que no existe."
        image="/media/barrels-bw.jpg"
        imageAlt="Barricas de vino en blanco y negro, luces y sombras marcadas"
        imageCaption="Alto, medio o bajo — nunca sin razón"
        subFeatures={[
          {
            title: 'Alto, medio o bajo — siempre visible',
            description:
              'Cada valoración lleva su nivel de confianza junto al precio, nunca escondido en un tooltip que nadie abre.',
          },
          {
            title: 'La razón, no solo la etiqueta',
            description:
              'Pasa el cursor sobre el nivel de confianza y verás por qué — comps de reventa, retail activo, o solo precio de salida de bodega.',
          },
          {
            title: 'Informativo, nunca asesoramiento',
            description:
              'Acervo muestra valor estimado de lo que ya tienes. No es una recomendación de inversión ni un consejo personalizado de compra o venta.',
          },
        ]}
      />

      <Manifesto />
      <FinalCta />
      <Footer />
    </div>
  )
}
