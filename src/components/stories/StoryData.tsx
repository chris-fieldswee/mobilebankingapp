import { ReactNode } from 'react';

// Define structure for each frame
export interface StoryFrame {
  id: number;
  imageSrc: string; // Path to the specific image for this frame
  text: ReactNode; // Use ReactNode to allow JSX
  cta?: {
    text: string;
    link: string; // Route path for navigation
  };
}

// Get current month name (e.g., "April")
const currentMonthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());
// Get previous month name (e.g., "March")
const prevMonthDate = new Date();
prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
const prevMonthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(prevMonthDate);


// Define the frame data using refined text and specific image paths
export const storyFramesData: StoryFrame[] = [
  {
    id: 1,
    imageSrc: "/stories/1.png", // Assuming images are in public/stories/
    text: (
      <>
        <h1 className="text-4xl font-bold mb-4">Hi, Ahmed! 👋</h1>
        <p className="text-muted-foreground">
          Here’s a recap of your finances for {prevMonthName}. Let’s take a quick look at how you did!
        </p>
      </>
    )
  },
  {
    id: 2,
    imageSrc: "/stories/2.png",
    text: (
      <>
        <h2 className="text-3xl font-semibold mb-4">Your Spending at a Glance</h2>
        <p className="mb-2">You spent <strong>SAR 31,600</strong> this month - <strong>5% less</strong> than last month.</p>
        <p className="mb-4 text-sm text-muted-foreground"> (Last month total: SAR 33,180)</p>
        {/* Border removed */}
        <div className="bg-muted/50 p-3 rounded-lg text-sm">
          <p>Biggest Transaction: <strong>SAR 8,800</strong> at Harvey Nichols.</p>
        </div>
      </>
    )
  },
  {
    id: 3,
    imageSrc: "/stories/3.png",
    text: (
       <>
        <h2 className="text-3xl font-semibold mb-4">Your Savings</h2>
        <p className="mb-2">You set aside <strong>SAR 18,820</strong> this month, keeping <strong>36%</strong> of your income.</p>
        <p className="mb-4">That’s <strong>SAR 1,200 more</strong> than last month.</p>
        <p className="text-sm font-medium mb-2">Savings Growth (Last 3 Months):</p>
        <p className="text-sm text-muted-foreground">Nov: SAR 851,160 | Dec: SAR 871,180 | Jan: SAR 890,000</p>
        <p className="mt-4">Every step towards saving counts - keep going! 💪</p>
      </>
    )
  },
    {
    id: 4,
    imageSrc: "/stories/4.png",
    text: (
       <>
        <h2 className="text-3xl font-semibold mb-4">A Well-Deserved Reward?</h2>
        <p className="mb-4">Noticed a salary increase? Congratulations! How about enjoying extra flexibility with our Platinum Credit Card?</p>
      </>
    ),
     cta: { text: "See Benefits", link: "/platinum-card-offer" }
  },
    {
    id: 5,
    imageSrc: "/stories/5.png",
    text: (
       <>
        <h2 className="text-3xl font-semibold mb-4">Strengthening Your Financial Safety Net</h2>
        <p className="mb-2">You’ve built up your savings by SAR 18,820 this month, bringing your total to <strong>SAR 890,000</strong>.</p>
        <p>At your current spending level, that’s enough to cover up to <strong>2.5 years</strong> of expenses - great financial planning!</p>
      </>
    )
  },
    {
    id: 6,
    imageSrc: "/stories/6.png",
    text: (
       <>
        <h2 className="text-3xl font-semibold mb-4">Your Financial Health Score</h2>
        <p className="text-4xl font-bold mb-2">85/100</p>
        <p>A solid performance this month!</p>
      </>
    )
  },
    {
    id: 7,
    imageSrc: "/stories/7.png",
    text: (
       <>
        <h2 className="text-3xl font-semibold mb-4">Make Your Money Work Harder</h2>
        <p className="mb-2">You're handling your finances well - why not take it a step further?</p>
        <p className="mb-4">Turn SAR 890,000 into SAR 923,400 in just 12 months with 3.75% annual returns!</p>
      </>
    ),
    // Note: Link target '/investments' needs to be created later
    cta: { text: "Explore Investment Options", link: "/investments" }
  },
    {
    id: 8,
    imageSrc: "/stories/8.png",
    text: (
       <>
        <h2 className="text-3xl font-semibold mb-4">Wrapping Up & Looking Ahead</h2>
        <p>That’s your financial wrap-up for {prevMonthName}! Keep up the great work, and we’re here to support you every step of the way.</p>
        <p className="mt-2">Here’s to an even more prosperous {currentMonthName}!</p>
      </>
    )
  }
];