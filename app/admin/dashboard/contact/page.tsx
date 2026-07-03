export default function ContactDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Info</h1>
      <div className="card bg-background border border-border p-8 text-center mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Content Managed Statically</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The "Contact Info" section (social links, email address, etc.) on your live portfolio is currently using static content. The contact form itself is fully functional and will send messages directly to your email! Dynamic editing for contact details will be enabled in a future update.
        </p>
      </div>
    </div>
  );
}
