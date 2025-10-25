import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import avatar1 from "@/assets/avatars/avatar-1.jpg";
import avatar2 from "@/assets/avatars/avatar-2.jpg";
import avatar3 from "@/assets/avatars/avatar-3.jpg";
import avatar4 from "@/assets/avatars/avatar-4.jpg";
import avatar5 from "@/assets/avatars/avatar-5.jpg";
import avatar6 from "@/assets/avatars/avatar-6.jpg";

interface EmployeeCardProps {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  jobTitle: string;
  department: string;
  location?: string;
  startDate?: string;
  avatarUrl?: string;
}

export const EmployeeCard = ({
  firstName,
  lastName,
  email,
  phone,
  jobTitle,
  department,
  location,
  startDate,
  avatarUrl,
}: EmployeeCardProps) => {
  const initials = `${firstName[0]}${lastName[0]}`;
  const fullName = `${firstName} ${lastName}`;
  
  const defaultAvatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
  const avatarIndex = (firstName.charCodeAt(0) + lastName.charCodeAt(0)) % defaultAvatars.length;
  const defaultAvatar = defaultAvatars[avatarIndex];
  const displayAvatar = avatarUrl || defaultAvatar;

  return (
    <Card className="group hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-border overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300 border-2 border-primary/20">
            <img src={displayAvatar} alt={fullName} className="w-full h-full object-cover" />
          </div>

          {/* Name */}
          <h3 className="text-xl font-semibold text-foreground mb-1">{fullName}</h3>
          
          {/* Job Title */}
          <p className="text-sm font-medium text-primary mb-2">{jobTitle}</p>
          
          {/* Department Badge */}
          <Badge variant="secondary" className="mb-4 bg-primary-light/20 text-primary-dark border-primary-light">
            {department}
          </Badge>

          {/* Contact Info */}
          <div className="w-full space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <a href={`mailto:${email}`} className="hover:text-primary transition-colors">
                {email}
              </a>
            </div>
            
            {phone && (
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href={`tel:${phone}`} className="hover:text-primary transition-colors">
                  {phone}
                </a>
              </div>
            )}
            
            {location && (
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{location}</span>
              </div>
            )}
            
            {startDate && (
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Started {new Date(startDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
