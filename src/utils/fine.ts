export const calculateFine = ({
  dueDate,
  returned,
  finePerDay,
}: {
  dueDate: string;
  returned: boolean;
  finePerDay: number;
}) => {

  if (returned) return 0;

  const now = new Date();

  const due = new Date(dueDate);

  if (now <= due) return 0;

  const diffMs = now.getTime() - due.getTime();

  const overdueDays = Math.ceil(
    diffMs / (1000 * 60 * 60 * 24)
  );

  return overdueDays * finePerDay;
};