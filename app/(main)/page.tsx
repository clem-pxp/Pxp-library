import { MainLayout } from '@/components/layout';
import { SearchBar } from '@/components/layout/search-bar';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <MainLayout breadcrumbs={[{ label: 'The Vault', href: '/' }]}>
      <div className="px-8 py-6">
        <div className="mb-15 pt-10">
          <h1 className="sub-3xl text-strong text-center">Good afternoon, PxP!</h1>
          <p className="mt-1 text-sm text-disabled text-center mb-6">Welcome back to the Vault 👋</p>
          <SearchBar className="mx-auto w-full max-w-75" />
        </div>

        {/* Empty state - will be replaced with component grid */}
        <div className="flex py-16 flex-col items-center justify-center rounded-xl border border-dashed border-border-base p-8 text-center bg-gray-100">
          <h3 className="mb-3 text-base text-soft">No components yet</h3>
          <Button size="large" structure="keyboard">
            Create your first component
            <div className="px-1 py-[0.125rem] rounded-4 bg-light/10 text-[0.625rem] font-medium leading-tight">C</div>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
