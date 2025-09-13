'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Cookie, Settings, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CookieBeleidPage() {
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
              Cookie Beleid
            </h1>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#30302e' }}>
              Informatie over hoe wij cookies en vergelijkbare technologieën gebruiken op onze website.
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
              <Cookie className="w-8 h-8" style={{ color: '#30302e' }} />
              <h2 className="text-2xl font-bold" style={{ color: '#30302e' }}>Wat zijn cookies?</h2>
            </div>
            <p className="text-lg mb-4" style={{ color: '#30302e' }}>
              Cookies zijn kleine tekstbestanden die worden opgeslagen op uw computer, tablet of smartphone wanneer u onze website bezoekt. Ze helpen ons om de website beter te laten functioneren en om informatie over uw bezoek te verzamelen.
            </p>
            <p className="text-lg" style={{ color: '#30302e' }}>
              Wij gebruiken cookies om uw ervaring op onze website te verbeteren, om te begrijpen hoe u onze website gebruikt, en om onze diensten te personaliseren.
            </p>
          </CardContent>
        </Card>

        {/* Cookie Types */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#30302e' }}>
              <Settings className="w-8 h-8" />
              Soorten Cookies die wij gebruiken
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Essential Cookies */}
            <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5" style={{ color: '#30302e' }} />
                <h3 className="text-lg font-semibold" style={{ color: '#30302e' }}>Noodzakelijke Cookies</h3>
              </div>
              <p className="text-sm mb-3" style={{ color: '#30302e' }}>
                Deze cookies zijn essentieel voor het functioneren van onze website en kunnen niet worden uitgeschakeld.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Doel</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• Website functionaliteit</li>
                    <li>• Beveiliging</li>
                    <li>• Sessiebeheer</li>
                    <li>• Authenticatie</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Voorbeelden</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• Login sessies</li>
                    <li>• Winkelwagen (indien van toepassing)</li>
                    <li>• CSRF beveiliging</li>
                    <li>• Taalvoorkeuren</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5" style={{ color: '#30302e' }} />
                <h3 className="text-lg font-semibold" style={{ color: '#30302e' }}>Analytische Cookies</h3>
              </div>
              <p className="text-sm mb-3" style={{ color: '#30302e' }}>
                Deze cookies helpen ons te begrijpen hoe bezoekers onze website gebruiken door informatie anoniem te verzamelen en te rapporteren.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Doel</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• Website prestaties</li>
                    <li>• Gebruikersgedrag</li>
                    <li>• Populariteit van content</li>
                    <li>• Technische problemen</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Gegevens</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• Paginaweergaven</li>
                    <li>• Tijd op website</li>
                    <li>• Verwijzingsbronnen</li>
                    <li>• Browser informatie</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
              <div className="flex items-center gap-2 mb-3">
                <Settings className="w-5 h-5" style={{ color: '#30302e' }} />
                <h3 className="text-lg font-semibold" style={{ color: '#30302e' }}>Functionele Cookies</h3>
              </div>
              <p className="text-sm mb-3" style={{ color: '#30302e' }}>
                Deze cookies stellen de website in staat om verbeterde functionaliteit en personalisatie te bieden.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Doel</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• Gebruikersvoorkeuren</li>
                    <li>• Personalisatie</li>
                    <li>• Verbeterde functionaliteit</li>
                    <li>• Gebruikerservaring</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Voorbeelden</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• Thema voorkeuren</li>
                    <li>• Taal instellingen</li>
                    <li>• Meme geschiedenis</li>
                    <li>• Interface instellingen</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Third Party Cookies */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#30302e' }}>
              <Shield className="w-8 h-8" />
              Cookies van Derden
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p style={{ color: '#30302e' }}>
              Onze website kan cookies van derden bevatten. Deze cookies worden geplaatst door externe diensten die op onze website worden gebruikt.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Google Analytics</h4>
                <p className="text-sm mb-2" style={{ color: '#30302e' }}>
                  Wij gebruiken Google Analytics om websiteverkeer te analyseren.
                </p>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Anonieme gegevensverzameling</li>
                  <li>• Website prestaties</li>
                  <li>• Gebruikersgedrag analyse</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Sociale Media</h4>
                <p className="text-sm mb-2" style={{ color: '#30302e' }}>
                  Sociale media platforms kunnen cookies plaatsen voor integratie.
                </p>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Share buttons</li>
                  <li>• Embedded content</li>
                  <li>• Sociale media tracking</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cookie Management */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardHeader>
            <CardTitle className="text-2xl" style={{ color: '#30302e' }}>
              Cookie Beheer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#30302e' }}>Uw Cookie Voorkeuren</h3>
              <p className="text-sm mb-4" style={{ color: '#30302e' }}>
                U kunt uw cookie voorkeuren beheren via de instellingen van uw browser of via onze cookie banner.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Browser Instellingen</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• Chrome: Instellingen &gt; Privacy &gt; Cookies</li>
                    <li>• Firefox: Opties &gt; Privacy &gt; Cookies</li>
                    <li>• Safari: Voorkeuren &gt; Privacy &gt; Cookies</li>
                    <li>• Edge: Instellingen &gt; Cookies</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Wat u kunt doen</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• Cookies accepteren</li>
                    <li>• Cookies weigeren</li>
                    <li>• Cookies verwijderen</li>
                    <li>• Specifieke cookies beheren</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#30302e' }}>Gevolgen van Cookie Uitschakeling</h3>
              <p className="text-sm mb-3" style={{ color: '#30302e' }}>
                Het uitschakelen van bepaalde cookies kan de functionaliteit van onze website beïnvloeden:
              </p>
              <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                <li>• Sommige functies werken mogelijk niet correct</li>
                <li>• Uw voorkeuren worden niet onthouden</li>
                <li>• U moet opnieuw inloggen bij elk bezoek</li>
                <li>• Personalisatie is niet beschikbaar</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardHeader>
            <CardTitle className="text-2xl" style={{ color: '#30302e' }}>
              Bewaartermijn van Cookies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Sessie Cookies</h4>
                <p className="text-sm" style={{ color: '#30302e' }}>
                  Worden automatisch verwijderd wanneer u uw browser sluit.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Persistente Cookies</h4>
                <p className="text-sm" style={{ color: '#30302e' }}>
                  Blijven bestaan voor een bepaalde periode (meestal 1-2 jaar).
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Analytische Cookies</h4>
                <p className="text-sm" style={{ color: '#30302e' }}>
                  Worden meestal bewaard voor 26 maanden (Google Analytics).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardHeader>
            <CardTitle className="text-2xl" style={{ color: '#30302e' }}>
              Uw Rechten
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p style={{ color: '#30302e' }}>
              Onder de AVG heeft u verschillende rechten met betrekking tot uw persoonlijke gegevens en cookies:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Informatie en Toegang</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Recht op informatie over cookies</li>
                  <li>• Recht op toegang tot uw gegevens</li>
                  <li>• Recht op correctie van gegevens</li>
                  <li>• Recht op verwijdering van gegevens</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Beperking en Bezwaar</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Recht op beperking van verwerking</li>
                  <li>• Recht op bezwaar tegen verwerking</li>
                  <li>• Recht op gegevensoverdraagbaarheid</li>
                  <li>• Recht op intrekking van toestemming</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardHeader>
            <CardTitle className="text-2xl" style={{ color: '#30302e' }}>
              Contact en Vragen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4" style={{ color: '#30302e' }}>
              Als u vragen heeft over ons cookie beleid of uw rechten, kunt u contact met ons opnemen:
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

        {/* Updates */}
        <Card className="bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-3" style={{ color: '#30302e' }}>Wijzigingen in dit Cookie Beleid</h3>
            <p className="text-sm" style={{ color: '#30302e' }}>
              Wij kunnen dit cookie beleid van tijd tot tijd bijwerken. Wijzigingen worden op deze pagina gepubliceerd en zijn onmiddellijk van kracht. 
              Wij adviseren u om deze pagina regelmatig te controleren op updates.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
