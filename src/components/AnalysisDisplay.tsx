
import React, { useState } from "react";
import { AlertTriangle, CheckCircle, ChevronDown, ChevronUp, HelpCircle, Info, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AnalysisClause {
  identified_parties: string;
  bias_flags: string[];
  ambiguities: string[];
  potential_loopholes: string[];
  legal_conflicts: string[];
  improvements?: string[];
  bias_score: number;
  clause: string;
}

interface AnalysisDisplayProps {
  analysisResults: AnalysisClause[];
  onClose: () => void;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({
  analysisResults,
  onClose,
}) => {
  const [expandedClause, setExpandedClause] = useState<number | null>(0);

  const getBiasColor = (score: number) => {
    if (score >= 0.7) return "bg-red-950/40 border-red-500/50 text-red-300";
    if (score >= 0.4) return "bg-amber-950/40 border-amber-500/50 text-amber-300";
    if (score >= 0.2) return "bg-yellow-950/40 border-yellow-500/50 text-yellow-300";
    return "bg-green-950/40 border-green-500/50 text-green-300";
  };

  const getBiasTextColor = (score: number) => {
    if (score >= 0.7) return "text-red-400";
    if (score >= 0.4) return "text-amber-400";
    if (score >= 0.2) return "text-yellow-400";
    return "text-green-400";
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "bias": return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case "ambiguity": return <HelpCircle className="w-4 h-4 text-yellow-400" />;
      case "loophole": return <Info className="w-4 h-4 text-amber-400" />;
      case "legal": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "improvement": return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const renderIssueList = (items: string[], type: string, title: string) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-4">
        <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
          {getIssueIcon(type)} {title} ({items.length})
        </h4>
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="text-sm text-slate-400 pl-6 border-l border-slate-700 py-1">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <Card className="border border-slate-700 bg-slate-900 shadow-xl">
          <CardHeader className="bg-slate-800 border-b border-slate-700">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl text-white">Document Analysis Results</CardTitle>
                <CardDescription className="text-slate-400">
                  Analysis of {analysisResults.length} clauses
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700 mb-6">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-slate-700">
                      <TableHead className="text-slate-300 w-[80px]">Clause</TableHead>
                      <TableHead className="text-slate-300">Summary</TableHead>
                      <TableHead className="text-slate-300 w-[150px]">Bias Score</TableHead>
                      <TableHead className="text-slate-300 w-[100px]">Issues</TableHead>
                      <TableHead className="text-slate-300 w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analysisResults.map((result, index) => {
                      const totalIssues = 
                        result.bias_flags.length + 
                        result.ambiguities.length + 
                        result.potential_loopholes.length + 
                        result.legal_conflicts.length;
                        
                      const isExpanded = expandedClause === index;
                      
                      return (
                        <React.Fragment key={index}>
                          <TableRow 
                            className={cn(
                              "cursor-pointer hover:bg-slate-800/70 border-slate-700/50",
                              isExpanded && "bg-slate-800/50"
                            )}
                            onClick={() => setExpandedClause(isExpanded ? null : index)}
                          >
                            <TableCell className="font-medium text-slate-300">#{index + 1}</TableCell>
                            <TableCell className="text-slate-300">
                              <div className="line-clamp-2">
                                {result.identified_parties}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className={`w-12 h-6 rounded flex items-center justify-center font-medium ${getBiasTextColor(result.bias_score)}`}>
                                  {result.bias_score.toFixed(2)}
                                </span>
                                <div className="w-full bg-slate-700 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      result.bias_score >= 0.7 
                                        ? "bg-red-500" 
                                        : result.bias_score >= 0.4 
                                        ? "bg-amber-500" 
                                        : result.bias_score >= 0.2 
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                    }`}
                                    style={{ width: `${result.bias_score * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {totalIssues > 0 ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-300">
                                  {totalIssues} {totalIssues === 1 ? 'issue' : 'issues'}
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-300">
                                  No issues
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="p-0 h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedClause(isExpanded ? null : index);
                                }}
                              >
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4 text-slate-400" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 text-slate-400" />
                                )}
                              </Button>
                            </TableCell>
                          </TableRow>
                          
                          {isExpanded && (
                            <TableRow className="hover:bg-transparent border-slate-700/50">
                              <TableCell colSpan={5} className="p-0">
                                <div className={`p-4 ${getBiasColor(result.bias_score)}`}>
                                  <div className="mb-4 border-b border-slate-600/30 pb-4">
                                    <h3 className="text-sm font-medium text-slate-200 mb-2">Original Clause:</h3>
                                    <p className="text-sm text-slate-300 bg-black/30 p-3 rounded">{result.clause}</p>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      {renderIssueList(result.bias_flags, "bias", "Bias Flags")}
                                      {renderIssueList(result.ambiguities, "ambiguity", "Ambiguities")}
                                    </div>
                                    <div>
                                      {renderIssueList(result.potential_loopholes, "loophole", "Potential Loopholes")}
                                      {renderIssueList(result.legal_conflicts, "legal", "Legal Conflicts")}
                                      {result.improvements && renderIssueList(result.improvements, "improvement", "Suggested Improvements")}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between bg-slate-800 border-t border-slate-700 py-4">
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Low Bias</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Medium Bias</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span>High Bias</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Very High Bias</span>
              </div>
            </div>
            <Button onClick={onClose} variant="outline" className="border-slate-600 text-slate-300">
              Close
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisDisplay;
