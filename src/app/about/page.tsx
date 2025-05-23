import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  return (
    <Card
      dir="rtl"
      className=" font-vazir  mx-auto mt-4 md:mt-10  p-1 md:p-6 rounded-2xl  border-none shadow-2xl"
    >
      <CardContent className="space-y-6 text-right py-8">
        <h2 className="text-2xl font-bold">✨ درباره پروژه</h2>
        <p>
          این پروژه به‌منظور ارسال برای یک مصاحبه کاری طراحی و توسعه
          داده شده است. تکنولوژی‌های به‌کار رفته در این پروژه شامل
          موارد زیر می‌باشند:
        </p>
        <div className="flex flex-wrap gap-2 justify-end">
          <Badge variant="outline">Next.js 15</Badge>
          <Badge variant="outline">TypeScript</Badge>
          <Badge variant="outline">Tailwind CSS</Badge>
          <Badge variant="outline">shadcn/ui</Badge>
        </div>

        <Separator />

        <ul className="list-none space-y-3 pr-5">
          {/* <li>
            <strong>آپلود تصاویر:</strong> چند تصویر از ChatGPT گرفته
            شده و داخل رابط پروژه آپلود شده‌اند.
          </li> */}
          <li>
            <strong>صفحه چت:</strong> دارای یک ComboBox است که با سرچ
            کاربر، از API
            <code className="mx-1 text-sm bg-muted px-1 rounded">
              /v3.1/name/${'{input}'}
            </code>
            کشورها را فچ می‌کند. پس از انتخاب، از سمت سرور و با
            استفاده از
            <code className="mx-1 text-sm bg-muted px-1 rounded">
              /v3.1/alpha/${'{country}'}
            </code>
            واطلاعات کامل دریافت می‌شود به سوالات پیش فرض پاسخ میدهد.
          </li>
          <li>
            <strong>صفحه Explore:</strong> درخواست اولیه بر اساس
            قاره‌ها ارسال می‌شود تا بار روی سرور کم‌تر شود. نتایج
            برگشتی در سمت کلاینت فیلتر و نمایش داده می‌شوند.
          </li>
          <li>
            <strong>صفحات محصول:</strong> به‌صورت Server-Side Rendered
            و با استفاده از پارامترها ساخته شده‌اند.
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
