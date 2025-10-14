import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { EmployeeCard } from "@/components/EmployeeCard";
import { SearchBar } from "@/components/SearchBar";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  job_title: string;
  department: string;
  location: string | null;
  start_date: string | null;
  avatar_url: string | null;
}

const Index = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .order("first_name", { ascending: true });

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast({
        title: "Error",
        description: "Failed to load employees. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const query = searchQuery.toLowerCase();
    return (
      employee.first_name.toLowerCase().includes(query) ||
      employee.last_name.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query) ||
      employee.job_title.toLowerCase().includes(query) ||
      employee.department.toLowerCase().includes(query) ||
      (employee.location && employee.location.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Employee Directory</h1>
              <p className="text-sm text-muted-foreground">Find and connect with team members</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery}
              placeholder="Search by name, title, department, or location..."
            />
            <div className="text-sm text-muted-foreground whitespace-nowrap">
              {filteredEmployees.length} {filteredEmployees.length === 1 ? "employee" : "employees"}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-96 bg-card rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No employees found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try adjusting your search" : "No employees in the directory yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                firstName={employee.first_name}
                lastName={employee.last_name}
                email={employee.email}
                phone={employee.phone || undefined}
                jobTitle={employee.job_title}
                department={employee.department}
                location={employee.location || undefined}
                startDate={employee.start_date || undefined}
                avatarUrl={employee.avatar_url || undefined}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
