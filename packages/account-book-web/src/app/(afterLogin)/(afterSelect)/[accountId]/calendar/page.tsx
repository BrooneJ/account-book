import Calendar from "@/app/ui/Calendar";
import LowHeader from "@/app/ui/Header/lowHeader";

export default function Page() {
  return (
    <div>
      <LowHeader headerLeft title="Calendar" />
      <Calendar />
    </div>
  );
}
