"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";

import { storage, db } from "@/firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  tagLine: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  imageUrl: z.any(),
  demoUrl: z.string().optional(),
  sourceUrl: z.string().optional(),
  technologies: z.array(z.string()).min(1, {
    message: "Add at least one technology.",
  }),
  projectDuration: z.coerce.number(),
  role: z.string().optional(),
  teamSize: z.coerce.number().optional(),
  status: z.string().optional(),
  features: z.array(z.string()).min(1, {
    message: "Add at least one feature.",
  }),
  challenges: z.array(z.string()).min(1, {
    message: "Add at least one challenges.",
  }),
});

export function AddFormComp() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  //technologi
  const [technologies, setTechnologies] = React.useState<string[]>([]);
  const techInputRef = React.useRef<HTMLInputElement>(null);
  //feature
  const [features, setFeatures] = React.useState<string[]>([]);
  const FeatureInputRef = React.useRef<HTMLInputElement>(null);
  //challenge
  const [challenges, setChallenges] = React.useState<string[]>([]);
  const ChallengeInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      tagLine: "",
      description: "",
      imageUrl: null,
      demoUrl: "",
      sourceUrl: "",
      technologies: [],
      projectDuration: 0,
      role: "",
      teamSize: 0,
      status: "",
      features: [],
      challenges: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const storageRef = ref(storage, `images/${values.imageUrl.name}`);
      await uploadBytes(storageRef, values.imageUrl);
      const downloadURL = await getDownloadURL(storageRef);
      await addDoc(collection(db, "project"), {
        title: values.title,
        tagLine: values.tagLine,
        description: values.description,
        imageUrl: downloadURL,
        demoUrl: values.demoUrl,
        sourceUrl: values.sourceUrl,
        technologies: values.technologies,
        projectDuration: values.projectDuration,
        role: values.role,
        teamSize: values.teamSize,
        status: values.status,
        features: values.features,
        challenges: values.challenges,
      });
      toast({
        title: "Success!",
        description: "Your portfolio project has been submitted.",
      });
      form.reset();
      setTechnologies([]);
      setFeatures([]);
      setChallenges([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  //technology
  const addTechnology = (tech: string) => {
    if (tech && !technologies.includes(tech)) {
      const newTechnologies = [...technologies, tech];
      setTechnologies(newTechnologies);
      form.setValue("technologies", newTechnologies);
    }
    if (techInputRef.current) {
      techInputRef.current.value = "";
    }
  };

  const removeTechnology = (tech: string) => {
    const newTechnologies = technologies.filter((t) => t !== tech);
    setTechnologies(newTechnologies);
    form.setValue("technologies", newTechnologies);
  };

  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.currentTarget;
      addTechnology(input.value.trim());
    }
  };

  //feature
  const addFeature = (feature: string) => {
    if (feature && !features.includes(feature)) {
      const newFeatures = [...features, feature];
      setFeatures(newFeatures);
      form.setValue("features", newFeatures);
    }
    if (FeatureInputRef.current) {
      FeatureInputRef.current.value = "";
    }
  };

  const removeFeature = (feature: string) => {
    const newFeatures = features.filter((t) => t !== feature);
    setFeatures(newFeatures);
    form.setValue("features", newFeatures);
  };

  const handleFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.currentTarget;
      addFeature(input.value.trim());
    }
  };

  //challenge
  const addChallenge = (challenge: string) => {
    if (challenge && !challenges.includes(challenge)) {
      const newChallenges = [...challenges, challenge];
      setChallenges(newChallenges);
      form.setValue("challenges", newChallenges);
    }
    if (FeatureInputRef.current) {
      FeatureInputRef.current.value = "";
    }
  };

  const removeChallenge = (challenge: string) => {
    const newChallenges = challenges.filter((t) => t !== challenge);
    setChallenges(newChallenges);
    form.setValue("challenges", newChallenges);
  };

  const handleChallengeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.currentTarget;
      addChallenge(input.value.trim());
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      form.setValue("imageUrl", file);
    }
  };
  return (
    <div className="mx-auto max-w-2xl p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add Portfolio Project</h1>
        <p className="text-muted-foreground">
          Share your latest work with the community
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input placeholder="My Awesome Project" {...field} />
                </FormControl>
                <FormDescription>The name of your project.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tagLine"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Tagline</FormLabel>
                <FormControl>
                  <Input placeholder="My Awesome Project" {...field} />
                </FormControl>
                <FormDescription>The TagLine of your project.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your project..."
                    className="min-h-[150px] resize-y"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe your project, its features, and your role.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={() => (
              <FormItem>
                <FormLabel>Preview Image</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {selectedImage && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">
                          Selected File: {selectedImage.name}
                        </p>
                        <Image
                          src={URL.createObjectURL(selectedImage)}
                          alt="Preview"
                          className="mt-2 h-32 w-32 object-cover rounded-md"
                          width={300}
                          height={300}
                        />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormDescription>
                  Upload an image to represent your project. Max size: 5MB.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-8 md:grid-cols-2">
            <FormField
              control={form.control}
              name="demoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live Demo URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://my-project.com" {...field} />
                  </FormControl>
                  <FormDescription>Link to the live version.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sourceUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source Code URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/username/repo"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Link to the source code.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <FormField
              control={form.control}
              name="projectDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="in month (ex:3)" {...field} />
                  </FormControl>
                  <FormDescription>How Long to finish project</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teamSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Size</FormLabel>
                  <FormControl>
                    <Input placeholder="exp: 4 developer(input:4)" {...field} />
                  </FormControl>
                  <FormDescription>
                    How Many people Contribute the Project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="frontend developer" {...field} />
                  </FormControl>
                  <FormDescription>
                    what role when you develop project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Live">Live</SelectItem>
                        <SelectItem value="No Live">No Live</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>What status project</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="technologies"
            render={() => (
              <FormItem>
                <FormLabel>Technologies Used</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        ref={techInputRef}
                        placeholder="Add technology..."
                        onKeyDown={handleTechKeyDown}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (techInputRef.current) {
                            addTechnology(techInputRef.current.value.trim());
                          }
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                          <button
                            type="button"
                            className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            onClick={() => removeTechnology(tech)}
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {tech}</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Press Enter or click the plus button to add technologies.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="features"
            render={() => (
              <FormItem>
                <FormLabel>Features Used</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        ref={FeatureInputRef}
                        placeholder="Add feature..."
                        onKeyDown={handleFeatureKeyDown}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (FeatureInputRef.current) {
                            addFeature(FeatureInputRef.current.value.trim());
                          }
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {features.map((feature) => (
                        <Badge key={feature} variant="secondary">
                          {feature}
                          <button
                            type="button"
                            className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            onClick={() => removeFeature(feature)}
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {feature}</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Press Enter or click the plus button to add Features.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="challenges"
            render={() => (
              <FormItem>
                <FormLabel>Challenges</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        ref={ChallengeInputRef}
                        placeholder="Add feature..."
                        onKeyDown={handleChallengeKeyDown}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (ChallengeInputRef.current) {
                            addChallenge(
                              ChallengeInputRef.current.value.trim()
                            );
                          }
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {challenges.map((challenge) => (
                        <Badge key={challenge} variant="secondary">
                          {challenge}
                          <button
                            type="button"
                            className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            onClick={() => removeChallenge(challenge)}
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {challenge}</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Press Enter or click the plus button to add Features.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Submitting..." : "Submit Project"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
