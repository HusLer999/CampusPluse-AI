import { z } from 'zod';

export const syllabusAIResponseSchema = z.object({
  courseName: z.string(),
  courseCode: z.string(),
  instructor: z.string().optional(),
  semester: z.string().optional(),
  meetingTimes: z.string().optional(),
  tasks: z.array(
    z.object({
      title: z.string(),
      description: z.string().optional(),
      dueDate: z.string().optional(), // ISO date string or description like "Week 4"
      weight: z.number().optional(),
      priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
      estimateMin: z.number().default(60),
      isMilestone: z.boolean().default(false),
    })
  ),
  weeklyTopics: z.array(
    z.object({
      week: z.number(),
      topic: z.string(),
      reading: z.string().optional(),
    })
  ),
});

export type SyllabusAIOutput = z.infer<typeof syllabusAIResponseSchema>;