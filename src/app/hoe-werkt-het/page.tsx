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
            In 6 Eenvoudige Stappen
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center p-4 border-2 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
              <CardContent className="pt-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#30302e' }}>
                  <span className="text-lg font-bold text-white">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#30302e' }}>Vul je gegevens in</h3>
                <p className="text-sm" style={{ color: '#30302e' }}>
                  Voer je naam in en beantwoord de vragen over je voorkeuren voor Schiedam.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 border-2 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
              <CardContent className="pt-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#30302e' }}>
                  <span className="text-lg font-bold text-white">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#30302e' }}>Genereer je meme</h3>
                <p className="text-sm" style={{ color: '#30302e' }}>
                  Ons systeem maakt automatisch een gepersonaliseerde meme voor je.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 border-2 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#fdee34' }}>
              <CardContent className="pt-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#fdee34' }}>
                  <span className="text-lg font-bold" style={{ color: '#30302e' }}>3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#30302e' }}>Bewerk je tekst</h3>
                <p className="text-sm" style={{ color: '#30302e' }}>
                  Pas je naam en meme-tekst aan tot je tevreden bent.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 border-2 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#fdee34' }}>
              <CardContent className="pt-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#fdee34' }}>
                  <span className="text-lg font-bold" style={{ color: '#30302e' }}>4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#30302e' }}>Goedkeuren & Uploaden</h3>
                <p className="text-sm" style={{ color: '#30302e' }}>
                  Klik "Goedkeuren & Uploaden" om je meme op te slaan.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 border-2 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
              <CardContent className="pt-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#30302e' }}>
                  <span className="text-lg font-bold text-white">5</span>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#30302e' }}>Download</h3>
                <p className="text-sm" style={{ color: '#30302e' }}>
                  Download je meme in PNG of JPG formaat voor hoge kwaliteit.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 border-2 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
              <CardContent className="pt-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#30302e' }}>
                  <span className="text-lg font-bold text-white">6</span>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#30302e' }}>Deel en geniet</h3>
                <p className="text-sm" style={{ color: '#30302e' }}>
                  Deel je meme op sociale media en bekijk het op het prikbord.
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
                    <li>• Real-time preview van je meme</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 - NEW: Text Editing */}
            <Card className="border-l-4 bg-white/90 backdrop-blur-sm" style={{ borderLeftColor: '#fdee34' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#30302e' }}>
                  <Settings className="w-8 h-8" style={{ color: '#fdee34' }} />
                  Stap 4: Tekst Bewerken & Aanpassen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg" style={{ color: '#30302e' }}>
                  Je kunt nu je meme volledig aanpassen voordat je deze deelt. 
                  Bewerk je naam en de meme-tekst tot je tevreden bent.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                    <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Bewerkingsopties</h4>
                    <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                      <li>• Pas je naam aan</li>
                      <li>• Wijzig de meme-tekst</li>
                      <li>• Real-time preview</li>
                      <li>• Reset naar origineel</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                    <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Gebruiksvriendelijk</h4>
                    <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                      <li>• Eenvoudige tekstvelden</li>
                      <li>• Directe preview updates</li>
                      <li>• Opslaan en reset functies</li>
                      <li>• Professionele interface</li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                  <h4 className="font-semibold mb-2 text-yellow-800">💡 Pro Tip</h4>
                  <p className="text-sm text-yellow-700">
                    Gebruik de tekstbewerker om je meme persoonlijker te maken. 
                    Je kunt je naam aanpassen of de boodschap verfijnen voordat je deze deelt!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 5 - NEW: Approval & Upload */}
            <Card className="border-l-4 bg-white/90 backdrop-blur-sm" style={{ borderLeftColor: '#fdee34' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#30302e' }}>
                  <CheckCircle className="w-8 h-8" style={{ color: '#fdee34' }} />
                  Stap 5: Goedkeuren & Uploaden
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg" style={{ color: '#30302e' }}>
                  Je meme wordt alleen geüpload naar het prikbord 
                  nadat je deze hebt goedgekeurd. Je hebt volledige controle over wanneer je content wordt gedeeld.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                    <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Goedkeuringsproces</h4>
                    <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                      <li>• Bekijk je finale meme</li>
                      <li>• Klik "Goedkeuren & Uploaden"</li>
                      <li>• Meme wordt opgeslagen op prikbord</li>
                      <li>• Direct beschikbaar voor anderen</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                    <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Privacy & Controle</h4>
                    <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                      <li>• Geen automatische upload</li>
                      <li>• Jij bepaalt wanneer je deelt</li>
                      <li>• Bewerk zo vaak als je wilt</li>
                      <li>• Volledige transparantie</li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <h4 className="font-semibold mb-2 text-green-800">✅ Veiligheid</h4>
                  <p className="text-sm text-green-700">
                    Je meme wordt alleen geüpload naar het prikbord wanneer jij daar expliciet toestemming voor geeft. 
                    Dit geeft je volledige controle over je content!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 6 - Download & Share */}
            <Card className="border-l-4 bg-white/90 backdrop-blur-sm" style={{ borderLeftColor: '#30302e' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#30302e' }}>
                  <Share2 className="w-8 h-8" style={{ color: '#30302e' }} />
                  Stap 6: Downloaden & Delen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg" style={{ color: '#30302e' }}>
                  Download je goedgekeurde meme in verschillende formaten en deel deze 
                  op sociale media of bekijk het op het prikbord.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                    <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Download Opties</h4>
                    <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                      <li>• PNG-formaat (transparant)</li>
                      <li>• JPG-formaat (wit achtergrond)</li>
                      <li>• Hoge kwaliteit (600x600px)</li>
                      <li>• Geoptimaliseerd voor alle platforms</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                    <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Prikbord Functies</h4>
                    <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                      <li>• Bekijk alle gemaakte memes</li>
                      <li>• Klik voor volledig scherm weergave</li>
                      <li>• Deel direct op sociale media</li>
                      <li>• Publiek zichtbaar voor iedereen</li>
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

        {/* Text Editing Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#30302e' }}>
            🆕 Nieuwe Tekstbewerking Functies
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/90 backdrop-blur-sm border-2" style={{ borderColor: '#fdee34' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl" style={{ color: '#30302e' }}>
                  <Settings className="w-6 h-6" style={{ color: '#fdee34' }} />
                  Volledige Tekstcontrole
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p style={{ color: '#30302e' }}>
                  Je hebt nu volledige controle over de tekst op je meme. Bewerk zowel je naam 
                  als de meme-boodschap tot je volledig tevreden bent.
                </p>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-1">Naam Bewerken</h4>
                    <p className="text-sm text-yellow-700">
                      Pas je naam aan, gebruik een pseudoniem, of voeg extra tekst toe.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-1">Meme Tekst Aanpassen</h4>
                    <p className="text-sm text-yellow-700">
                      Wijzig de boodschap, maak het persoonlijker, of verfijn de tekst.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-2" style={{ borderColor: '#fdee34' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl" style={{ color: '#30302e' }}>
                  <Eye className="w-6 h-6" style={{ color: '#fdee34' }} />
                  Real-time Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p style={{ color: '#30302e' }}>
                  Zie je wijzigingen direct in de preview. Geen verrassingen - je weet 
                  precies hoe je finale meme eruit zal zien.
                </p>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-1">Live Updates</h4>
                    <p className="text-sm text-green-700">
                      De meme preview wordt direct bijgewerkt terwijl je typt.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-1">Professionele Interface</h4>
                    <p className="text-sm text-green-700">
                      Eenvoudige tekstvelden met opslaan en reset functionaliteit.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 bg-white/90 backdrop-blur-sm border-2" style={{ borderColor: '#30302e' }}>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: '#30302e' }}>
                Hoe werkt de Tekstbewerker?
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold" style={{ color: '#30302e' }}>1</span>
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Klik "Tekst bewerken"</h4>
                  <p className="text-sm" style={{ color: '#30302e' }}>
                    Open de tekstbewerker om je meme aan te passen
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold" style={{ color: '#30302e' }}>2</span>
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Bewerk je tekst</h4>
                  <p className="text-sm" style={{ color: '#30302e' }}>
                    Pas je naam en meme-tekst aan en zie direct het resultaat
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold" style={{ color: '#30302e' }}>3</span>
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Klik "Opslaan"</h4>
                  <p className="text-sm" style={{ color: '#30302e' }}>
                    Sla je wijzigingen op en ga verder met goedkeuren
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
                      <span>Formaten: PNG (transparant) + JPG (wit)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: '#30302e' }} />
                      <span>Kwaliteit: Hoge resolutie (2x scale)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: '#30302e' }} />
                      <span>Tekstbewerking: Volledig aanpasbaar</span>
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
                      <span>Tekstbewerking & real-time preview</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: '#30302e' }} />
                      <span>Goedkeuringsworkflow</span>
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
                      <span>Controleerbare opslag</span>
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
