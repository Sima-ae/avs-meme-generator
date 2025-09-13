'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Shield, Users, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AlgemeneVoorwaardenPage() {
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
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Terug naar Home
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#30302e' }}>
              Algemene Voorwaarden
            </h1>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#30302e' }}>
              Voor het gebruik van de Alles voor Schiedam meme generator.
            </p>
            <p className="text-sm mt-2" style={{ color: '#30302e' }}>
              Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        
        {/* Introduction */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8" style={{ color: '#30302e' }} />
              <h2 className="text-2xl font-bold" style={{ color: '#30302e' }}>Inleiding</h2>
            </div>
            <p className="text-lg mb-4" style={{ color: '#30302e' }}>
              Welkom bij de Alles voor Schiedam meme generator. Deze algemene voorwaarden regelen het gebruik van onze website en diensten. Door gebruik te maken van onze website, gaat u akkoord met deze voorwaarden.
            </p>
            <p className="text-lg" style={{ color: '#30302e' }}>
              Wij behouden ons het recht voor om deze voorwaarden te wijzigen. Wijzigingen worden op deze pagina gepubliceerd en zijn onmiddellijk van kracht.
            </p>
          </CardContent>
        </Card>

        {/* Definitions */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#30302e' }}>
              <Shield className="w-8 h-8" />
              Definities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#30302e' }}>Wij/Ons/Onze</h3>
                <p style={{ color: '#30302e' }}>
                  Verwijst naar Alles voor Schiedam en de beheerders van deze website.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#30302e' }}>U/Gebruiker</h3>
                <p style={{ color: '#30302e' }}>
                  Verwijst naar elke persoon die gebruik maakt van onze website of diensten.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#30302e' }}>Website</h3>
                <p style={{ color: '#30302e' }}>
                  Verwijst naar allesvoorschiedam.nl en alle gerelateerde subdomeinen.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#30302e' }}>Diensten</h3>
                <p style={{ color: '#30302e' }}>
                  Verwijst naar de meme generator en alle gerelateerde functionaliteiten.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms Sections */}
        <div className="space-y-8">
          
          {/* Section 1: Use of Service */}
          <Card className="bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
            <CardHeader>
              <CardTitle className="text-xl" style={{ color: '#30302e' }}>
                1. Gebruik van de Dienst
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Toegestaan gebruik</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Het genereren van memes voor persoonlijk gebruik</li>
                  <li>• Het delen van gemaakte memes op sociale media</li>
                  <li>• Het bekijken van het publieke prikbord</li>
                  <li>• Het uploaden van eigen afbeeldingen (voor geregistreerde gebruikers)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Verboden gebruik</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Het uploaden van ongeschikte of beledigende content</li>
                  <li>• Het misbruiken van de dienst voor commerciële doeleinden zonder toestemming</li>
                  <li>• Het proberen te hacken of de dienst te verstoren</li>
                  <li>• Het schenden van intellectuele eigendomsrechten</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: User Content */}
          <Card className="bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
            <CardHeader>
              <CardTitle className="text-xl" style={{ color: '#30302e' }}>
                2. Gebruikerscontent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p style={{ color: '#30302e' }}>
                Door content te uploaden naar onze dienst, verleent u ons een niet-exclusieve, royalty-vrije licentie om deze content te gebruiken, weer te geven en te distribueren in verband met onze dienst.
              </p>
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Uw verantwoordelijkheden</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• U bent verantwoordelijk voor alle content die u zelf uploadt</li>
                  <li>• U garandeert dat u de rechten heeft om de content te uploaden</li>
                  <li>• U stemt in met het publiekelijk tonen van uw content op het prikbord</li>
                  <li>• U begrijpt dat content kan worden verwijderd door beheerders</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Privacy */}
          <Card className="bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
            <CardHeader>
              <CardTitle className="text-xl" style={{ color: '#30302e' }}>
                3. Privacy en Gegevensbescherming
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p style={{ color: '#30302e' }}>
                Wij respecteren uw privacy en beschermen uw persoonlijke gegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG).
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Gegevens die wij verzamelen</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• Naam (optioneel voor meme-generatie)</li>
                    <li>• Email adres (voor accountregistratie)</li>
                    <li>• Gemaakte memes en uploads</li>
                    <li>• Gebruiksstatistieken</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Hoe wij gegevens gebruiken</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• Voor het leveren van onze diensten</li>
                    <li>• Voor het verbeteren van de website</li>
                    <li>• Voor communicatie over updates</li>
                    <li>• Voor het handhaven van de voorwaarden</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Intellectual Property */}
          <Card className="bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
            <CardHeader>
              <CardTitle className="text-xl" style={{ color: '#30302e' }}>
                4. Intellectueel Eigendom
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p style={{ color: '#30302e' }}>
                Alle rechten, titels en belangen in en met betrekking tot de website en diensten, inclusief alle intellectuele eigendomsrechten, zijn en blijven eigendom van Alles voor Schiedam.
              </p>
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Toegestaan gebruik van onze content</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Gemaakte memes mogen worden gedeeld op sociale media</li>
                  <li>• De meme generator mag worden gebruikt voor persoonlijke doeleinden</li>
                  <li>• Het prikbord mag worden bekeken door alle bezoekers</li>
                  <li>• Commercieel gebruik vereist voorafgaande schriftelijke toestemming</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Disclaimers */}
          <Card className="bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
            <CardHeader>
              <CardTitle className="text-xl" style={{ color: '#30302e' }}>
                5. Disclaimer en Beperkingen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Service disclaimer</h4>
                <p className="text-sm" style={{ color: '#30302e' }}>
                  Onze dienst wordt geleverd "zoals deze is" zonder enige garantie. Wij garanderen niet dat de dienst ononderbroken of foutloos zal functioneren.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Aansprakelijkheidsbeperking</h4>
                <p className="text-sm" style={{ color: '#30302e' }}>
                  Wij zijn niet aansprakelijk voor enige directe, indirecte, incidentele of gevolgschade die voortvloeit uit het gebruik van onze dienst.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Termination */}
          <Card className="bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
            <CardHeader>
              <CardTitle className="text-xl" style={{ color: '#30302e' }}>
                6. Beëindiging
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p style={{ color: '#30302e' }}>
                Wij behouden ons het recht voor om uw toegang tot de dienst te beëindigen of te schorsen zonder voorafgaande kennisgeving in geval van schending van deze voorwaarden.
              </p>
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Redenen voor beëindiging</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Schending van deze algemene voorwaarden</li>
                  <li>• Misbruik van de dienst</li>
                  <li>• Uploaden van ongeschikte content</li>
                  <li>• Technische problemen of onderhoud</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 7: Governing Law */}
          <Card className="bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
            <CardHeader>
              <CardTitle className="text-xl" style={{ color: '#30302e' }}>
                7. Toepasselijk Recht
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: '#30302e' }}>
                Deze voorwaarden worden beheerst door het Nederlandse recht. Eventuele geschillen worden voorgelegd aan de bevoegde rechter in Nederland.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl" style={{ color: '#30302e' }}>
                <Users className="w-6 h-6" />
                Contact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4" style={{ color: '#30302e' }}>
                Voor vragen over deze algemene voorwaarden kunt u contact met ons opnemen:
              </p>
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <p className="font-semibold mb-2" style={{ color: '#30302e' }}>Contactgegevens</p>
                <p className="text-sm" style={{ color: '#30302e' }}>
                  E-mail: info@allesvoorschiedam.nl<br />
                  Website: www.allesvoorschiedam.nl
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-left">
          <Card className="bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
            <CardContent className="p-6">
              <p className="text-sm" style={{ color: '#30302e' }}>
                Door gebruik te maken van onze dienst, gaat u akkoord met deze algemene voorwaarden. <br />
                Wij adviseren u om deze voorwaarden regelmatig te controleren op updates.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
