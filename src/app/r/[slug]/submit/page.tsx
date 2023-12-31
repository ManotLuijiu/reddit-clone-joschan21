import { Button } from '@/components/ui/Button';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

import Editor from '../../../../components/Editor';

interface pageProps {
  params: {
    slug: string;
  };
}

const SubmitPage = async ({ params }: pageProps) => {
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: params.slug,
    },
  });

  if (!subreddit) return notFound();

  return (
    <div className="flex flex-col items-start gap-6">
      {/* heading */}
      <div className="border-b border-gold1 pb-5">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
            สร้างกะทู้
          </h3>
          <p className="ml-2 mt-1 truncate text-sm text-gray-500">
            ใน <span className="italic">เอสธีท</span>/{params.slug}
          </p>
        </div>
      </div>

      {/* form */}
      <Editor subredditId={subreddit.id} />

      <div className="w-full flex justify-end">
        <Button type="submit" className="w-full" form="subreddit-post-form">
          โพสต์
        </Button>
      </div>
    </div>
  );
};

export default SubmitPage;
