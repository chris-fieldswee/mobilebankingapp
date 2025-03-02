
export interface Story {
  id: number;
  image: string;
  type: "image";
  title: string;
}

export const stories: Story[] = [
  {
    id: 1,
    image: "/1.png",
    type: "image",
    title: "Hi, Ali Al-Faisal!"
  },
  {
    id: 2,
    image: "/2.png",
    type: "image",
    title: "Your Spending at a Glance"
  },
  {
    id: 3,
    image: "/3.png",
    type: "image",
    title: "Your Savings"
  },
  {
    id: 4,
    image: "/4.png",
    type: "image",
    title: "A Well-Deserved Reward?"
  },
  {
    id: 5,
    image: "/5.png",
    type: "image",
    title: "Strengthening Your Financial Safety Net"
  },
  {
    id: 6,
    image: "/6.png",
    type: "image",
    title: "Your Financial Health Score"
  },
  {
    id: 7,
    image: "/7.png",
    type: "image",
    title: "Make Your Money Work Harder"
  },
  {
    id: 8,
    image: "/8.png",
    type: "image",
    title: "Wrapping Up & Looking Ahead"
  }
];
