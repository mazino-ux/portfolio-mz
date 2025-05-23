'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './Button'
import { Badge } from './Badge'

type ProjectCardProps = {
  title: string
  description: string
  tags: string[]
  image: string
  link?: string
  github?: string
}

export const ProjectCard = ({ title, description, tags, image, link, github }: ProjectCardProps) => {
  return (
    <div className="group relative h-full bg-background border border-border rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex gap-2">
            {link && (
              <Button variant="secondary" size="sm">
                <Link href={link} target="_blank">
                  Live Demo
                </Link>
              </Button>
            )}
            {github && (
              <Button variant="outline" size="sm">
                <Link href={github} target="_blank">
                  View Code
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}