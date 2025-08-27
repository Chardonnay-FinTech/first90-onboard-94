import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Lock, Eye, Database } from "lucide-react";

interface TermsModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export const TermsModal = ({ isOpen, onAccept, onDecline }: TermsModalProps) => {
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [hasReadPrivacy, setHasReadPrivacy] = useState(false);

  const canProceed = hasReadTerms && hasReadPrivacy;

  const securityFeatures = [
    {
      icon: Shield,
      title: "Data Encryption",
      description: "All personal information is encrypted both in transit and at rest using industry-standard AES-256 encryption."
    },
    {
      icon: Lock,
      title: "Access Controls", 
      description: "Role-based permissions ensure only authorized personnel can access your sensitive information."
    },
    {
      icon: Eye,
      title: "Privacy Protection",
      description: "SSN and financial data are masked by default and only revealed to authorized users when necessary."
    },
    {
      icon: Database,
      title: "Secure Storage",
      description: "Your data is stored in secure, compliant facilities with regular security audits and monitoring."
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Privacy & Data Protection Agreement
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Security Overview */}
            <div className="bg-accent-light rounded-lg p-6">
              <h3 className="text-lg font-semibold text-accent-foreground mb-4">Your Data Security is Our Priority</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <feature.icon className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <h4 className="font-medium text-accent-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms of Service */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={hasReadTerms}
                  onCheckedChange={(checked) => setHasReadTerms(checked === true)}
                />
                <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I have read and agree to the Terms of Service
                </label>
              </div>
              
              <div className="bg-muted rounded-lg p-4 text-sm space-y-3">
                <h4 className="font-semibold">Terms of Service</h4>
                <p>
                  By using First 90, you agree to provide accurate and complete information. You understand that this platform is designed to facilitate the onboarding process between financial advisors and their clients.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>You will provide truthful and accurate information</li>
                  <li>You understand this information will be used for account opening and advisory services</li>
                  <li>You consent to the collection and processing of your personal and financial data</li>
                  <li>You acknowledge that your advisor will have access to the information you provide</li>
                </ul>
              </div>
            </div>

            {/* Privacy Policy */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="privacy" 
                  checked={hasReadPrivacy}
                  onCheckedChange={(checked) => setHasReadPrivacy(checked === true)}
                />
                <label htmlFor="privacy" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I have read and agree to the Privacy Policy
                </label>
              </div>
              
              <div className="bg-muted rounded-lg p-4 text-sm space-y-3">
                <h4 className="font-semibold">Privacy Policy & PII Protection</h4>
                <p>
                  We are committed to protecting your personally identifiable information (PII) in accordance with federal and state privacy laws.
                </p>
                
                <div className="space-y-2">
                  <h5 className="font-medium">Information We Collect:</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Personal identifiers (name, SSN, date of birth)</li>
                    <li>Contact information (address, phone, email)</li>
                    <li>Financial information (income, net worth, investment goals)</li>
                    <li>Employment and bank details</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium">How We Use Your Information:</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Account opening and onboarding processes</li>
                    <li>Compliance with regulatory requirements</li>
                    <li>Providing personalized advisory services</li>
                    <li>Communication between you and your advisor</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium">Data Protection Measures:</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>End-to-end encryption for all data transmission</li>
                    <li>Secure storage with limited access controls</li>
                    <li>Regular security audits and monitoring</li>
                    <li>SSN masking and controlled revelation protocols</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium">Your Rights:</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Request access to your personal information</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data (subject to regulatory requirements)</li>
                    <li>Withdraw consent for non-essential data processing</li>
                  </ul>
                </div>

                <p className="text-xs text-muted-foreground border-t pt-2">
                  This platform complies with Gramm-Leach-Bliley Act (GLBA), SEC regulations, and applicable state privacy laws. 
                  For questions about our privacy practices, contact your advisor or our compliance team.
                </p>
              </div>
            </div>

            {/* Consent Acknowledgment */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h4 className="font-semibold text-primary mb-2">Important Consent</h4>
              <p className="text-sm">
                By clicking "I Agree" below, you explicitly consent to the collection, processing, and sharing of your personal and financial information as described above. You understand that this information is necessary for your advisor to provide comprehensive financial services and meet regulatory obligations.
              </p>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={onDecline}
            className="flex-1"
          >
            I Decline
          </Button>
          <Button 
            onClick={onAccept}
            disabled={!canProceed}
            className="flex-1 btn-hero"
          >
            I Agree & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};