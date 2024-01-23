import { getFormStats, getForms } from '@/actions/form';
import { ReactNode, Suspense } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LuView } from 'react-icons/lu';
import { BiRightArrowAlt } from 'react-icons/bi';
import { FaEdit, FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { TbArrowBounce } from 'react-icons/tb';
import { Separator } from '@/components/ui/separator';
import CreateFormButton from '@/components/CreateFormButton';
import { Form } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { formatDistance } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='container p-4'>
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className='my-6' />
      <h2 className='text-4xl font-bold col-span-2'>Manage Forms</h2>
      <Separator className='my-6' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <CreateFormButton />
        <Suspense
          fallback={[1, 2, 3].map(el => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
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

function FormCardSkeleton() {
  return <Skeleton className='border-2 border-primary/20 w-full h-[190px]' />;
}

async function FormCards() {
  const forms = await getForms();
  return (
    <>
      {forms.map(form => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between gap-2'>
          <span className='truncate font-bold'>{form.name}</span>
          {form.published && <Badge>Aired</Badge>}
          {!form.published && <Badge variant={'destructive'}>Draft</Badge>}
        </CardTitle>
        <CardDescription className='flex items-center justify-between text-muted-foreground text-sm'>
          {formatDistance(form.createdAt, new Date(), { addSuffix: true })}
          {!form.published && (
            <span className='flex items-center gap-2'>
              <LuView className='text-muted-foreground' />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className='text-muted-foreground' />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent
        title={form.description || 'No description'}
        className='h-[20px] text-muted-foreground text-sm truncate'
      >
        {form.description || 'No description'}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className='2-full mt-2 text-md gap-4'>
            <Link href={`/forms/${form.id}`}>
              View Submissions <BiRightArrowAlt />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button
            asChild
            variant={'secondary'}
            className='2-full mt-2 text-md gap-4'
          >
            <Link href={`/builder/${form.id}`}>
              Edit Form <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
