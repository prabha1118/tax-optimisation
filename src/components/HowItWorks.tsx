
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";

interface HowItWorksProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowItWorks = ({ isOpen, onClose }: HowItWorksProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-info-blue">How Tax Harvesting Works?</DialogTitle>
        </DialogHeader>
        <div className="mt-4 text-sm space-y-4">
          <p>
            Tax harvesting is a strategy to minimize tax liability by strategically selling cryptocurrency assets 
            that are currently at a loss to offset capital gains from other investments.
          </p>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2">Key Benefits:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Reduce your overall tax burden by offsetting gains with losses</li>
              <li>Potentially lower your tax bracket by reducing taxable income</li>
              <li>Rebalance your portfolio while capturing tax advantages</li>
              <li>Improve long-term after-tax returns on your investments</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2">How to Use This Tool:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Review your current holdings and their unrealized gains/losses</li>
              <li>Select assets with unrealized losses that you want to harvest</li>
              <li>See the potential tax savings before making any decisions</li>
              <li>Consult with your tax advisor before executing any tax harvesting strategy</li>
            </ol>
          </div>
          <div className="bg-muted p-4 rounded-md mt-4">
            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> Tax regulations vary by country. The information provided here is for educational purposes 
              only and should not be considered as financial advice. Always consult with a qualified tax professional.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HowItWorks;
