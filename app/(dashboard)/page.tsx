import { getFormStats } from '@/actions/form';
import { ReactNode, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LuView } from 'react-icons/lu';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { TbArrowBounce } from 'react-icons/tb';
import { Separator } from '@/components/ui/separator';
import CreateFormButton from '@/components/CreateFormButton';

export default function Home() {
  return (
    <div className='container p-4'>
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className='my-6' />
      <h2 className='text-4xl font-bold col-span-2'>Manage Forms</h2>
      <Separator className='my-6' />
      <CreateFormButton />
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await getFormStats();

  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardProps {
  data?: Awaited<ReturnType<typeof getFormStats>>;
  loading: boolean;
}

function StatsCards(props: StatsCardProps) {
  const { data, loading } = props;

  return (
    <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
      <StatsCard
        title='Total visits'
        icon={<LuView className='text-blue-600' />}
        helperText='All time form visits'
        value={data?.visits.toLocaleString() || ''}
        loading={loading}
        className='shadow-md shadow-blue-600'
      />

      <StatsCard
        title='Total submissions'
        icon={<FaWpforms className='text-yellow-600' />}
        helperText='All time form submissions'
        value={data?.submissions.toLocaleString() || ''}
        loading={loading}
        className='shadow-md shadow-yellow-600'
      />

      <StatsCard
        title='Submission rate'
        icon={<HiCursorClick className='text-green-600' />}
        helperText='Visits that result in form submission'
        value={data?.submissionRate.toLocaleString() + '%' || ''}
        loading={loading}
        className='shadow-md shadow-green-600'
      />

      <StatsCard
        title='Bounce rate'
        icon={<TbArrowBounce className='text-red-600' />}
        helperText='Visits without interaction'
        value={data?.visits.toLocaleString() + '%' || ''}
        loading={loading}
        className='shadow-md shadow-red-600'
      />
    </div>
  );
}

function StatsCard({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}: {
  title: String;
  value: string;
  helperText: String;
  loading: boolean;
  className: string;
  icon: ReactNode;
}) {
  return (
    <Card className={className}>
      <CardHeader className='flex flex-row justify-between items-center pb-2'>
        <CardTitle className='text-sm font-medium text-muted-foreground'>
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {loading && (
            <Skeleton>
              <span className='opacity-0'>0</span>
            </Skeleton>
          )}

          {!loading && value}
          <p className='text-xs text-muted-foreground pt-1'>{helperText}</p>
        </div>
      </CardContent>
    </Card>
  );
}
