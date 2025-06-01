
import LoadingSpinner from '@/components/shared/loading-spinner';

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
