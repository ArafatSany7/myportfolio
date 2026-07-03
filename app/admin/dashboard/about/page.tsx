export default function AboutDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">About Me</h1>
      <div className="card bg-background border border-border p-8 text-center mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Content Managed Statically</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The "About Me" section on your live portfolio is currently using carefully formatted static content to ensure the layout remains perfect. To edit the text in the About section, you currently need to update the source file directly. Dynamic editing for this section will be enabled in a future update!
        </p>
      </div>
    </div>
  );
}
