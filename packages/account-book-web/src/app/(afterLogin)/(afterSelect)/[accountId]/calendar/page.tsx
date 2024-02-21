import Calendar from "@/app/ui/Calendar";
import LowHeader from "@/app/ui/Header/lowHeader";

export default function Page({ params }: { params: { accountId: string } }) {
  const accountId = params.accountId;
  return (
    <div>
      <LowHeader headerLeft title="Calendar" />
      <Calendar accountId={accountId} />
    </div>
  );
}
