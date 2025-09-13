'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Lock, Eye, User, Database, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyBeleidPage() {
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
              Privacy Beleid
            </h1>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#30302e' }}>
              Hoe wij uw persoonlijke gegevens verzamelen, gebruiken en beschermen in overeenstemming met de AVG.
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
              <Shield className="w-8 h-8" style={{ color: '#30302e' }} />
              <h2 className="text-2xl font-bold" style={{ color: '#30302e' }}>Inleiding</h2>
            </div>
            <p className="text-lg mb-4" style={{ color: '#30302e' }}>
              Alles voor Schiedam respecteert uw privacy en is toegewijd aan de bescherming van uw persoonlijke gegevens. 
              Dit privacy beleid legt uit hoe wij uw gegevens verzamelen, gebruiken en beschermen.
            </p>
            <p className="text-lg" style={{ color: '#30302e' }}>
              Wij verwerken uw gegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG) en andere toepasselijke privacy wetgeving.
            </p>
          </CardContent>
        </Card>

        {/* Data Controller */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#30302e' }}>
              <User className="w-8 h-8" />
              Gegevensverantwoordelijke
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p style={{ color: '#30302e' }}>
              Alles voor Schiedam is de verantwoordelijke voor de verwerking van uw persoonlijke gegevens.
            </p>
            <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
              <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Contactgegevens</h4>
              <p className="text-sm" style={{ color: '#30302e' }}>
                E-mail: info@allesvoorschiedam.nl<br />
                Website: www.allesvoorschiedam.nl
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Collection */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#30302e' }}>
              <Database className="w-8 h-8" />
              Welke Gegevens Verzamelen Wij?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#30302e' }}>Gegevens die u direct verstrekt</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Account Gegevens</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• Naam (optioneel)</li>
                    <li>• Email adres</li>
                    <li>• Wachtwoord (gehashed)</li>
                    <li>• Account rol</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Content Gegevens</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• Gemaakte memes</li>
                    <li>• Geüploade afbeeldingen</li>
                    <li>• Quiz antwoorden</li>
                    <li>• Prikbord bijdragen</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#30302e' }}>Gegevens die automatisch worden verzameld</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Technische Gegevens</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• IP adres</li>
                    <li>• Browser type en versie</li>
                    <li>• Besturingssysteem</li>
                    <li>• Apparaat informatie</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Gebruiksgegevens</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• Paginaweergaven</li>
                    <li>• Tijd op website</li>
                    <li>• Klikgedrag</li>
                    <li>• Verwijzingsbronnen</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Basis */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#30302e' }}>
              <Lock className="w-8 h-8" />
              Rechtsgrond voor Verwerking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p style={{ color: '#30302e' }}>
              Wij verwerken uw gegevens op basis van de volgende rechtsgronden onder de AVG:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Toestemming (Art. 6 lid 1a AVG)</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Marketing communicatie</li>
                  <li>• Cookies (niet-noodzakelijke)</li>
                  <li>• Profiling voor personalisatie</li>
                  <li>• Sociale media integratie</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Uitvoering Overeenkomst (Art. 6 lid 1b AVG)</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Account beheer</li>
                  <li>• Dienstverlening</li>
                  <li>• Meme generatie</li>
                  <li>• Prikbord functionaliteit</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Gerechtvaardigd Belang (Art. 6 lid 1f AVG)</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Website beveiliging</li>
                  <li>• Fraudepreventie</li>
                  <li>• Service verbetering</li>
                  <li>• Analytics</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Wettelijke Verplichting (Art. 6 lid 1c AVG)</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Belastingverplichtingen</li>
                  <li>• Juridische verplichtingen</li>
                  <li>• Toezicht vereisten</li>
                  <li>• Bewaartermijnen</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Usage */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#30302e' }}>
              <Eye className="w-8 h-8" />
              Hoe Gebruiken Wij Uw Gegevens?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#30302e' }}>Primaire Doeleinden</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Dienstverlening</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• Meme generatie en opslag</li>
                    <li>• Account beheer</li>
                    <li>• Prikbord functionaliteit</li>
                    <li>• Gebruikersondersteuning</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Communicatie</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• Service updates</li>
                    <li>• Technische notificaties</li>
                    <li>• Beveiligingswaarschuwingen</li>
                    <li>• Marketing (met toestemming)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#30302e' }}>Secundaire Doeleinden</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Analyse en Verbetering</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• Website prestaties</li>
                    <li>• Gebruikerservaring</li>
                    <li>• Functionaliteit verbetering</li>
                    <li>• Trend analyse</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Beveiliging en Compliance</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                    <li>• Fraudepreventie</li>
                    <li>• Misbruik detectie</li>
                    <li>• Wettelijke verplichtingen</li>
                    <li>• Toezicht en audit</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Sharing */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardHeader>
            <CardTitle className="text-2xl" style={{ color: '#30302e' }}>
              Delen van Gegevens
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p style={{ color: '#30302e' }}>
              Wij delen uw gegevens niet met derden, behalve in de volgende specifieke gevallen:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Service Providers</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Hosting providers</li>
                  <li>• Database services</li>
                  <li>• Analytics tools</li>
                  <li>• Email services</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Wettelijke Vereisten</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Rechterlijke bevelen</li>
                  <li>• Wettelijke verplichtingen</li>
                  <li>• Toezicht autoriteiten</li>
                  <li>• Fraudepreventie</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#30302e' }}>
              <Shield className="w-8 h-8" />
              Gegevensbeveiliging
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p style={{ color: '#30302e' }}>
              Wij implementeren passende technische en organisatorische maatregelen om uw gegevens te beschermen:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Technische Maatregelen</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• SSL/TLS encryptie</li>
                  <li>• Wachtwoord hashing</li>
                  <li>• Firewall bescherming</li>
                  <li>• Reguliere updates</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Organisatorische Maatregelen</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Toegangscontrole</li>
                  <li>• Medewerker training</li>
                  <li>• Incident response</li>
                  <li>• Privacy by design</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardHeader>
            <CardTitle className="text-2xl" style={{ color: '#30302e' }}>
              Bewaartermijnen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p style={{ color: '#30302e' }}>
              Wij bewaren uw gegevens niet langer dan noodzakelijk voor de doeleinden waarvoor zij zijn verzameld:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Account Gegevens</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Actieve accounts: Onbeperkt</li>
                  <li>• Inactieve accounts: 3 jaar</li>
                  <li>• Verwijderde accounts: 30 dagen</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Content Gegevens</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Gemaakte memes: 2 jaar</li>
                  <li>• Uploads: 1 jaar</li>
                  <li>• Analytics: 26 maanden</li>
                </ul>
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
              Onder de AVG heeft u verschillende rechten met betrekking tot uw persoonlijke gegevens:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Informatie en Toegang</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Recht op informatie (Art. 13/14 AVG)</li>
                  <li>• Recht op toegang (Art. 15 AVG)</li>
                  <li>• Recht op correctie (Art. 16 AVG)</li>
                  <li>• Recht op verwijdering (Art. 17 AVG)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Beperking en Bezwaar</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Recht op beperking (Art. 18 AVG)</li>
                  <li>• Recht op bezwaar (Art. 21 AVG)</li>
                  <li>• Recht op overdraagbaarheid (Art. 20 AVG)</li>
                  <li>• Recht op intrekking toestemming</li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
              <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Hoe kunt u uw rechten uitoefenen?</h4>
              <p className="text-sm mb-2" style={{ color: '#30302e' }}>
                U kunt uw rechten uitoefenen door contact met ons op te nemen via:
              </p>
              <p className="text-sm" style={{ color: '#30302e' }}>
                Email: info@000-it.com<br />
                Wij reageren binnen 30 dagen op uw verzoek.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Breach */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: '#30302e' }}>
              <AlertTriangle className="w-8 h-8" />
              Datalek Procedures
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p style={{ color: '#30302e' }}>
              In het onwaarschijnlijke geval van een datalek hebben wij procedures om dit snel te detecteren, te onderzoeken en te melden:
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Detectie</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Monitoring systemen</li>
                  <li>• Incident response team</li>
                  <li>• 24/7 bewaking</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Onderzoek</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Impact assessment</li>
                  <li>• Root cause analyse</li>
                  <li>• Betrokken gegevens</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Melding</h4>
                <ul className="space-y-1 text-sm" style={{ color: '#30302e' }}>
                  <li>• Autoriteit (72 uur)</li>
                  <li>• Betrokkenen (indien nodig)</li>
                  <li>• Transparante communicatie</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* International Transfers */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardHeader>
            <CardTitle className="text-2xl" style={{ color: '#30302e' }}>
              Internationale Doorgifte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ color: '#30302e' }}>
              Uw gegevens worden primair verwerkt binnen de Europese Economische Ruimte (EER). 
              Indien gegevens worden doorgestuurd naar landen buiten de EER, zorgen wij voor passende beschermingsmaatregelen 
              zoals standaardcontractbepalingen of adequaatheidsbesluiten.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardHeader>
            <CardTitle className="text-2xl" style={{ color: '#30302e' }}>
              Contact en Klachten
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p style={{ color: '#30302e' }}>
              Voor vragen over dit privacy beleid of om uw rechten uit te oefenen, kunt u contact met ons opnemen:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Contactgegevens</h4>
                <p className="text-sm" style={{ color: '#30302e' }}>
                  E-mail: info@allesvoorschiedam.nl<br />
                  Website: www.allesvoorschiedam.nl
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white" style={{ borderColor: '#30302e', border: '1px solid' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#30302e' }}>Klachten</h4>
                <p className="text-sm" style={{ color: '#30302e' }}>
                  U heeft het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens (AP) 
                  via www.autoriteitpersoonsgegevens.nl
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Updates */}
        <Card className="bg-white/90 backdrop-blur-sm" style={{ borderColor: '#30302e' }}>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-3" style={{ color: '#30302e' }}>Wijzigingen in dit Privacy Beleid</h3>
            <p className="text-sm" style={{ color: '#30302e' }}>
              Wij kunnen dit privacy beleid van tijd tot tijd bijwerken. Wijzigingen worden op deze pagina gepubliceerd 
              en zijn onmiddellijk van kracht. Voor belangrijke wijzigingen zullen wij u via email of via de website informeren. 
              Wij adviseren u om deze pagina regelmatig te controleren op updates.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
