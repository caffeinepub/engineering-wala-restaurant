import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, RefreshCw, ShieldCheck } from "lucide-react";
import { useState } from "react";
import {
  useGetAllFeedback,
  useGetAllOrders,
  useUpdateOrderStatus,
} from "../hooks/useQueries";

const OWNER_PASSWORD = "aadarshshukla8800";
const SESSION_KEY = "ew_owner_auth";

const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

function formatTime(timestamp: bigint | number | undefined): string {
  if (!timestamp) return "-";
  const ms =
    typeof timestamp === "bigint"
      ? Number(timestamp) / 1_000_000
      : Number(timestamp);
  return new Date(ms).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Preparing: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    "Out for Delivery": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
    Cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  const cls =
    colorMap[status] ?? "bg-gray-500/20 text-gray-400 border-gray-500/30";
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}
    >
      {status}
    </span>
  );
}

export default function OwnerPanel() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "true",
  );
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const {
    data: orders = [],
    refetch: refetchOrders,
    isFetching: ordersLoading,
  } = useGetAllOrders();
  const {
    data: feedbacks = [],
    refetch: refetchFeedback,
    isFetching: feedbackLoading,
  } = useGetAllFeedback();
  const updateStatusMutation = useUpdateOrderStatus();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === OWNER_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect password. Try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthenticated(false);
    setPasswordInput("");
    window.location.hash = "/";
  };

  if (!authenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: "#0B0F14" }}
        data-ocid="owner.panel"
      >
        <div
          className="w-full max-w-sm rounded-2xl p-8"
          style={{
            background: "#171C22",
            border: "1px solid rgba(242,154,46,0.2)",
          }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full btn-orange flex items-center justify-center font-display font-bold text-xl mx-auto mb-4">
              EW
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Owner Panel
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Engineering Wala
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="owner-password"
                className="text-xs text-muted-foreground mb-1 block"
              >
                Password
              </label>
              <input
                id="owner-password"
                type="password"
                placeholder="Enter owner password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm text-foreground outline-none"
                style={{
                  background: "#0B0F14",
                  border: `1px solid ${authError ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
                }}
                data-ocid="owner.password.input"
              />
              {authError && (
                <p
                  className="text-xs text-red-500 mt-1"
                  data-ocid="owner.password.error_state"
                >
                  {authError}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="btn-orange w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              data-ocid="owner.login.primary_button"
            >
              <ShieldCheck size={16} /> Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const sortedOrders = [...(orders as any[])].sort((a, b) => {
    const ta =
      typeof a.timestamp === "bigint"
        ? Number(a.timestamp)
        : (a.timestamp ?? 0);
    const tb =
      typeof b.timestamp === "bigint"
        ? Number(b.timestamp)
        : (b.timestamp ?? 0);
    return tb - ta;
  });

  const sortedFeedbacks = [...(feedbacks as any[])].sort((a, b) => {
    const ta =
      typeof a.timestamp === "bigint"
        ? Number(a.timestamp)
        : (a.timestamp ?? 0);
    const tb =
      typeof b.timestamp === "bigint"
        ? Number(b.timestamp)
        : (b.timestamp ?? 0);
    return tb - ta;
  });

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0B0F14" }}
      data-ocid="owner.panel"
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b border-border/50 px-6 py-4 flex items-center justify-between"
        style={{
          background: "rgba(11,15,20,0.95)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full btn-orange flex items-center justify-center font-display font-bold text-sm">
            EW
          </div>
          <div>
            <h1 className="font-display font-bold text-base leading-tight">
              <span className="text-orange">Owner</span> Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">Engineering Wala</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="gap-2 border-border/50 text-muted-foreground hover:text-foreground"
          data-ocid="owner.logout.button"
        >
          <LogOut size={14} /> Logout
        </Button>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-6" style={{ background: "#171C22" }}>
            <TabsTrigger value="orders" data-ocid="owner.orders.tab">
              Orders{" "}
              {orders.length > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {orders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="feedback" data-ocid="owner.feedback.tab">
              Feedback{" "}
              {feedbacks.length > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {feedbacks.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-foreground text-lg">All Orders</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetchOrders()}
                disabled={ordersLoading}
                className="gap-2 border-border/50 text-muted-foreground"
                data-ocid="owner.orders.secondary_button"
              >
                <RefreshCw
                  size={14}
                  className={ordersLoading ? "animate-spin" : ""}
                />
                Refresh
              </Button>
            </div>

            {sortedOrders.length === 0 ? (
              <div
                className="rounded-2xl p-12 text-center"
                style={{
                  background: "#171C22",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                data-ocid="owner.orders.empty_state"
              >
                <p className="text-muted-foreground">No orders yet.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Orders will appear here once placed.
                </p>
              </div>
            ) : (
              <div
                className="rounded-2xl overflow-hidden border border-border/30"
                style={{ background: "#171C22" }}
                data-ocid="owner.orders.table"
              >
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      <TableHead className="text-muted-foreground">
                        Order ID
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Customer
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Items
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Total
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Payment
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Status
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Time
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedOrders.map((order: any, idx: number) => (
                      <TableRow
                        key={String(order.id ?? idx)}
                        style={{ borderColor: "rgba(255,255,255,0.04)" }}
                        data-ocid={`owner.orders.row.${idx + 1}`}
                      >
                        <TableCell className="font-mono text-orange text-sm">
                          #EW-{String(order.id ?? idx).padStart(4, "0")}
                        </TableCell>
                        <TableCell className="text-sm text-foreground">
                          {order.address?.split(",")[0] ?? "-"}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {Array.isArray(order.items)
                            ? order.items.length
                            : "-"}{" "}
                          items
                        </TableCell>
                        <TableCell className="text-sm font-medium text-foreground">
                          ₹{order.total ? Number(order.total) : "-"}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {order.paymentMethod ?? "-"}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={order.status ?? "Pending"}
                            onValueChange={(val) =>
                              updateStatusMutation.mutate({
                                orderId: order.id,
                                status: val,
                              })
                            }
                          >
                            <SelectTrigger
                              className="h-7 text-xs w-40 border-border/30"
                              style={{ background: "#0B0F14" }}
                              data-ocid={`owner.orders.status.${idx + 1}.select`}
                            >
                              <SelectValue>
                                <StatusBadge
                                  status={order.status ?? "Pending"}
                                />
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent style={{ background: "#171C22" }}>
                              {ORDER_STATUSES.map((s) => (
                                <SelectItem
                                  key={s}
                                  value={s}
                                  className="text-xs"
                                >
                                  <StatusBadge status={s} />
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatTime(order.timestamp)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="feedback">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-foreground text-lg">
                Customer Feedback
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetchFeedback()}
                disabled={feedbackLoading}
                className="gap-2 border-border/50 text-muted-foreground"
                data-ocid="owner.feedback.secondary_button"
              >
                <RefreshCw
                  size={14}
                  className={feedbackLoading ? "animate-spin" : ""}
                />
                Refresh
              </Button>
            </div>

            {sortedFeedbacks.length === 0 ? (
              <div
                className="rounded-2xl p-12 text-center"
                style={{
                  background: "#171C22",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                data-ocid="owner.feedback.empty_state"
              >
                <p className="text-muted-foreground">No feedback yet.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Customer feedback will appear here.
                </p>
              </div>
            ) : (
              <div
                className="rounded-2xl overflow-hidden border border-border/30"
                style={{ background: "#171C22" }}
                data-ocid="owner.feedback.table"
              >
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      <TableHead className="text-muted-foreground">
                        Name
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Phone
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Email
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Message
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Time
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedFeedbacks.map((fb: any, idx: number) => (
                      <TableRow
                        key={String(fb.id ?? idx)}
                        style={{ borderColor: "rgba(255,255,255,0.04)" }}
                        data-ocid={`owner.feedback.row.${idx + 1}`}
                      >
                        <TableCell className="text-sm font-medium text-foreground">
                          {fb.name ?? "-"}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {fb.phone ?? "-"}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {fb.email ?? "-"}
                        </TableCell>
                        <TableCell className="text-sm text-foreground max-w-xs">
                          <p className="truncate" title={fb.message}>
                            {fb.message ?? "-"}
                          </p>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatTime(fb.timestamp)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
