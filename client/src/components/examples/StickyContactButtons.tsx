import StickyContactButtons from '../StickyContactButtons';

export default function StickyContactButtonsExample() {
  return (
    <div className="h-screen relative">
      <StickyContactButtons />
      <div className="p-8">
        <p className="text-muted-foreground">Scroll down to see the sticky contact buttons in the bottom-right corner.</p>
      </div>
    </div>
  );
}
