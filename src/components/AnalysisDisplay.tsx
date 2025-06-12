
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

export interface AnalysisClause {
  clause_type: string;
  clause_text: string;
  risk_level: 'low' | 'medium' | 'high';
  summary: string;
  recommendation: string;
  identified_parties: string[];
  clause: string;
}

interface AnalysisDisplayProps {
  analysis: AnalysisClause[];
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="w-full max-w-full">
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg sm:text-xl text-white">
            Document Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[60vh] w-full">
            <div className="p-4 sm:p-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700/50 hover:bg-slate-700/30">
                    <TableHead className="text-slate-300 font-medium text-xs sm:text-sm">
                      Clause Type
                    </TableHead>
                    <TableHead className="text-slate-300 font-medium text-xs sm:text-sm">
                      Risk Level
                    </TableHead>
                    <TableHead className="text-slate-300 font-medium text-xs sm:text-sm">
                      Summary
                    </TableHead>
                    <TableHead className="text-slate-300 font-medium text-xs sm:text-sm">
                      Recommendation
                    </TableHead>
                    <TableHead className="text-slate-300 font-medium text-xs sm:text-sm">
                      Parties
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analysis.map((clause, index) => (
                    <TableRow 
                      key={index} 
                      className="border-slate-700/50 hover:bg-slate-700/20 transition-colors"
                    >
                      <TableCell className="font-medium text-slate-200 text-xs sm:text-sm">
                        {clause.clause_type}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`${getRiskColor(clause.risk_level)} text-xs border`}
                        >
                          {clause.risk_level.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300 text-xs sm:text-sm max-w-xs">
                        <div className="line-clamp-3">
                          {clause.summary}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300 text-xs sm:text-sm max-w-xs">
                        <div className="line-clamp-3">
                          {clause.recommendation}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300 text-xs sm:text-sm">
                        <div className="flex flex-wrap gap-1">
                          {clause.identified_parties?.map((party, idx) => (
                            <Badge 
                              key={idx} 
                              variant="secondary" 
                              className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs"
                            >
                              {party}
                            </Badge>
                          )) || (
                            <span className="text-slate-500 text-xs">No parties identified</span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisDisplay;
