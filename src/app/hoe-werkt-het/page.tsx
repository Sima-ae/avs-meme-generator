'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, Upload, Share2, Eye, Settings, Shield, Heart } from 'lucide-react';
import Link from 'next/link';

export default function HoeWerktHetPage() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#fdee34' }}>
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/images/Achtergrond.png')",
        }}
      />
      
      {/* Header Section */}
      <div className="relative z-10 bg-white/90 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#30302e' }}>
              Hoe werkt de Meme Generator?
            </h1>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#30302e' }}>
              Ontdek hoe je in een paar eenvoudige stappen je eigen gepersonaliseerde 
              "Alles voor Schiedam" meme kunt maken en delen.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        
        {/* Quick Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#30302e' }}>
            In 3 Eenvoudige Stappen
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-2 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#30302e' }}>
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#30302e' }}>Vul je gegevens in</h3>
                <p style={{ color: '#30302e' }}>
                  Voer je naam in en beantwoord de vragen over je voorkeuren voor Schiedam.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#30302e' }}>
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#30302e' }}>Genereer je meme</h3>
                <p style={{ color: '#30302e' }}>
                  Ons systeem maakt automatisch een gepersonaliseerde meme voor je.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#30302e' }}>
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#30302e' }}>Deel en geniet</h3>
                <p style={{ color: '#30302e' }}>
                  Download je meme en deel het op sociale media of het prikbord.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#30302e' }}>
            Gedetailleerde Uitleg
          </h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <Card className="border-l-4 bg-white/90 backdrop-blur-sm" style={{ borderLeftColor: '#30302e' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#30302e' }}>
                  <Users className="w-8 h-8" style={{ color: '#30302e' }} />
                  Stap 1: Persoonlijke Informatie
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg" style={{ color: '#30302e' }}>
                  Begin door je naam in te voeren. Deze naam wordt prominent weergegeven op je meme, 
                  waardoor het een persoonlijke touch krijgt.
                </p>
                <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Wat gebeurt er met je gegevens?</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• Je naam wordt alleen gebruikt voor de meme-generatie</li>
                    <li>• Geen persoonlijke gegevens worden opgeslagen</li>
                    <li>• Je kunt anoniem blijven door een pseudoniem te gebruiken</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-l-4 bg-white/90 backdrop-blur-sm" style={{ borderLeftColor: '#30302e' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#30302e' }}>
                  <Settings className="w-8 h-8" style={{ color: '#30302e' }} />
                  Stap 2: Quiz en Voorkeuren
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg" style={{ color: '#30302e' }}>
                  Beantwoord een korte quiz over je voorkeuren en mening over Schiedam. 
                  Deze antwoorden bepalen welke gepersonaliseerde boodschap op je meme komt te staan.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                    <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Quiz Vragen</h4>
                    <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                      <li>• Wat vind je het leukst aan Schiedam?</li>
                      <li>• Welke activiteit spreekt je het meest aan?</li>
                      <li>• Wat maakt Schiedam bijzonder voor jou?</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                    <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Resultaat</h4>
                    <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                      <li>• Gepersonaliseerde boodschap</li>
                      <li>• Passende afbeelding en stijl</li>
                      <li>• Unieke meme voor jou</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-l-4 bg-white/90 backdrop-blur-sm" style={{ borderLeftColor: '#30302e' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#30302e' }}>
                  <Upload className="w-8 h-8" style={{ color: '#30302e' }} />
                  Stap 3: Meme Generatie
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg" style={{ color: '#30302e' }}>
                  Ons geavanceerde systeem genereert automatisch een professionele meme 
                  met jouw persoonlijke gegevens en voorkeuren.
                </p>
                <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Technische Details</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• Hoge kwaliteit PNG-formaat (600x600 pixels)</li>
                    <li>• Professionele typografie en layout</li>
                    <li>• Geoptimaliseerd voor sociale media</li>
                    <li>• Automatische upload naar het prikbord</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="border-l-4 bg-white/90 backdrop-blur-sm" style={{ borderLeftColor: '#30302e' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#30302e' }}>
                  <Share2 className="w-8 h-8" style={{ color: '#30302e' }} />
                  Stap 4: Delen en Bekijken
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg" style={{ color: '#30302e' }}>
                  Je meme wordt automatisch opgeslagen en gedeeld op ons prikbord, 
                  waar iedereen het kan bekijken en waarderen.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                    <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Prikbord Functies</h4>
                    <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                      <li>• Bekijk alle gemaakte memes</li>
                      <li>• Klik voor volledig scherm weergave</li>
                      <li>• Deel direct op sociale media</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                    <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Download Opties</h4>
                    <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                      <li>• PNG-formaat voor hoge kwaliteit</li>
                      <li>• Geoptimaliseerd voor alle platforms</li>
                      <li>• Direct beschikbaar na generatie</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#30302e' }}>
            Platform Functies
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
              <CardContent className="pt-6">
                <Eye className="w-12 h-12 mx-auto mb-4" style={{ color: '#30302e' }} />
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#30302e' }}>Publiek Prikbord</h3>
                <p style={{ color: '#30302e' }}>
                  Alle gemaakte memes zijn zichtbaar voor iedereen, 
                  zodat je de creativiteit van anderen kunt bewonderen.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 mx-auto mb-4" style={{ color: '#30302e' }} />
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#30302e' }}>Admin Beheer</h3>
                <p style={{ color: '#30302e' }}>
                  Beheerders kunnen memes beheren, verplaatsen en indien nodig verwijderen 
                  voor een schone en georganiseerde ervaring.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
              <CardContent className="pt-6">
                <Heart className="w-12 h-12 mx-auto mb-4" style={{ color: '#30302e' }} />
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#30302e' }}>Gemeenschap</h3>
                <p style={{ color: '#30302e' }}>
                  Deel je liefde voor Schiedam met anderen en ontdek 
                  hoe divers en creatief onze gemeenschap is.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#30302e' }}>
            Technische Specificaties
          </h2>
          
          <Card className="bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#30302e' }}>Meme Eigenschappen</h3>
                  <ul className="space-y-2" style={{ color: '#30302e' }}>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: '#30302e' }} />
                      <span>Afmeting: 600x600 pixels</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: '#30302e' }} />
                      <span>Formaat: PNG met transparantie</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: '#30302e' }} />
                      <span>Kwaliteit: Hoge resolutie</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: '#30302e' }} />
                      <span>Bestandsgrootte: Geoptimaliseerd</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#30302e' }}>Platform Features</h3>
                  <ul className="space-y-2" style={{ color: '#30302e' }}>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: '#30302e' }} />
                      <span>Responsive design</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: '#30302e' }} />
                      <span>Drag & drop functionaliteit</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: '#30302e' }} />
                      <span>Volledig scherm modus</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: '#30302e' }} />
                      <span>Automatische opslag</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#30302e' }}>
                Klaar om je eigen meme te maken?
              </h2>
              <p className="text-xl mb-6" style={{ color: '#30302e' }}>
                Start nu en deel je liefde voor Schiedam met de wereld!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: '#30302e' }}>
                    Start Meme Generator
                  </Button>
                </Link>
                <Link href="/prikbord">
                  <Button size="lg" variant="outline" className="hover:bg-gray-100" style={{ borderColor: '#30302e', color: '#30302e' }}>
                    Bekijk Prikbord
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#30302e' }}>
            Veelgestelde Vragen
          </h2>
          
          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#30302e' }}>Is de meme generator gratis?</h3>
                <p style={{ color: '#30302e' }}>
                  Ja, de meme generator is volledig gratis te gebruiken. Je hoeft geen account aan te maken 
                  en er zijn geen verborgen kosten.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#30302e' }}>Kan ik mijn meme bewerken na generatie?</h3>
                <p style={{ color: '#30302e' }}>
                  Momenteel kun je de meme niet direct bewerken, maar je kunt altijd een nieuwe meme 
                  genereren met andere antwoorden om verschillende resultaten te krijgen.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#30302e' }}>Worden mijn gegevens opgeslagen?</h3>
                <p style={{ color: '#30302e' }}>
                  Alleen je meme wordt opgeslagen op het prikbord. Je persoonlijke gegevens zoals naam 
                  worden alleen gebruikt voor de meme-generatie en niet permanent opgeslagen.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#30302e' }}>Kan ik memes van anderen verwijderen?</h3>
                <p style={{ color: '#30302e' }}>
                  Alleen beheerders kunnen memes verwijderen. Als je een ongepaste meme ziet, 
                  neem dan contact met ons op via de contactpagina.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
