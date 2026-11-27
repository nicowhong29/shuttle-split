"use client";

import { FileText, Printer } from "lucide-react";
import { useState } from "react";

export interface ReceiptPlayer {
  name: string;
  amountOwed: string;
  paid: boolean;
}

export interface ReceiptData {
  sessionId: string;
  location: string;
  sessionDate: string;
  courtDuration: number;
  courtCost: number;
  shuttleType: string;
  shuttlesUsed: number;
  shuttleCost: number;
  totalPrice: number;
  perPersonPrice: number;
  players: ReceiptPlayer[];
}

interface DownloadReceiptButtonProps extends ReceiptData {
  mode?: "download" | "print";
}

const formatMoney = (amount: number | string) => Number(amount).toFixed(2);

export function DownloadReceiptButton({
  sessionId,
  location,
  sessionDate,
  courtDuration,
  courtCost,
  shuttleType,
  shuttlesUsed,
  shuttleCost,
  totalPrice,
  perPersonPrice,
  players,
  mode = "download",
}: DownloadReceiptButtonProps) {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    setDownloading(true);
    setError(null);
    let printWindow: Window | null = null;

    try {
      if (mode === "print") {
        printWindow = window.open("about:blank", "_blank");
        if (!printWindow) {
          setError("Allow pop-ups to print the receipt.");
          return;
        }
      }

      const { Document, Page, Image, StyleSheet, Text, View, pdf } =
        await import("@react-pdf/renderer");

      const styles = StyleSheet.create({
        page: {
          padding: 40,
          fontFamily: "Helvetica",
          fontSize: 10,
          color: "#1f2937",
        },
        header: {
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 16,
          marginBottom: 24,
          borderBottomWidth: 1,
          borderBottomColor: "#d1d5db",
        },
        logoContainer: {
          flexDirection: "row",
          justifyContent: "center",
        },
        logo: {
          width: 40,
          height: 36,
          marginRight: 12,
        },
        brand: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#006c4b",
          marginBottom: 4,
        },
        subtitle: {
          fontSize: 9,
          color: "#6b7280",
        },
        alignRight: {
          textAlign: "right",
        },
        matchId: {
          fontSize: 11,
          fontWeight: "bold",
          marginBottom: 4,
        },
        venue: {
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 20,
        },
        sectionTitle: {
          fontSize: 10,
          fontWeight: "bold",
          color: "#374151",
          marginBottom: 8,
        },
        costRow: {
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: "#e5e7eb",
        },
        totalRow: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 12,
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor: "#9ca3af",
          fontSize: 13,
          fontWeight: "bold",
        },
        shareCard: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f0fdf4",
          padding: 14,
          marginTop: 20,
          marginBottom: 24,
        },
        shareLabel: {
          fontSize: 10,
          fontWeight: "bold",
          color: "#166534",
          marginBottom: 4,
        },
        shareAmount: {
          fontSize: 16,
          fontWeight: "bold",
          color: "#166534",
        },
        playersHeading: {
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 8,
          borderBottomWidth: 1,
          borderBottomColor: "#9ca3af",
          fontSize: 9,
          fontWeight: "bold",
          color: "#6b7280",
        },
        playerRow: {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 9,
          borderBottomWidth: 1,
          borderBottomColor: "#e5e7eb",
        },
        playerName: {
          flexGrow: 1,
          flexBasis: 0,
        },
        playerAmount: {
          width: 90,
          textAlign: "right",
          marginRight: 20,
        },
        status: {
          width: 55,
          textAlign: "right",
          fontSize: 9,
          fontWeight: "bold",
        },
        paid: {
          color: "#15803d",
        },
        pending: {
          color: "#b45309",
        },
        footer: {
          position: "absolute",
          bottom: 20,
          left: 40,
          right: 40,
          textAlign: "center",
          fontSize: 8,
          color: "#9ca3af",
        },
      });

      const receipt = (
        <Document title={`Session ${sessionId.slice(0, 8)} Receipt`}>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <View>
                  <Image style={styles.logo} src="/icons/surfing_shuttle.png" />
                </View>
                <View>
                  <Text style={styles.brand}>SHUTTLESPLIT</Text>
                  <Text style={styles.subtitle}>SESSION RECEIPT</Text>
                </View>
              </View>
              <View style={styles.alignRight}>
                <Text style={styles.matchId}>
                  MATCH #{sessionId.slice(0, 8).toUpperCase()}
                </Text>
                <Text>{sessionDate}</Text>
              </View>
            </View>

            <Text style={styles.venue}>{location}</Text>

            <Text style={styles.sectionTitle}>COST BREAKDOWN</Text>
            <View style={styles.costRow}>
              <Text>Court booking ({courtDuration}h)</Text>
              <Text>RM {formatMoney(courtCost)}</Text>
            </View>
            <View style={styles.costRow}>
              <Text>
                Shuttlecocks ({shuttlesUsed}x {shuttleType})
              </Text>
              <Text>RM {formatMoney(shuttleCost)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text>GRAND TOTAL</Text>
              <Text>RM {formatMoney(totalPrice)}</Text>
            </View>

            <View style={styles.shareCard}>
              <View>
                <Text style={styles.shareLabel}>PER PLAYER SHARE</Text>
                <Text>{players.length} players</Text>
              </View>
              <Text style={styles.shareAmount}>
                RM {formatMoney(perPersonPrice)} each
              </Text>
            </View>

            <Text style={styles.sectionTitle}>PLAYER PAYMENT STATUS</Text>
            <View style={styles.playersHeading}>
              <Text style={styles.playerName}>PLAYER</Text>
              <Text style={styles.playerAmount}>SHARE</Text>
            </View>
            {players.map((player, index) => (
              <View key={`${player.name}-${index}`} style={styles.playerRow}>
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.playerAmount}>
                  RM {formatMoney(player.amountOwed)}
                </Text>
              </View>
            ))}

            <Text style={styles.footer} fixed>
              Generated by ShuttleSplit
            </Text>
          </Page>
        </Document>
      );

      const blob = await pdf(receipt).toBlob();
      const downloadUrl = URL.createObjectURL(blob);
      if (mode === "print" && printWindow) {
        printWindow.addEventListener(
          "load",
          () => {
            printWindow?.focus();
            printWindow?.print();
          },
          { once: true },
        );
        printWindow.location.href = downloadUrl;
        window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 60_000);
      } else {
        const link = window.document.createElement("a");
        link.href = downloadUrl;
        link.download = `session-${sessionId.slice(0, 8)}-receipt.pdf`;
        link.click();
        window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
      }
    } catch (downloadError) {
      printWindow?.close();
      console.error("Failed to generate session receipt PDF.", downloadError);
      setError(
        mode === "print"
          ? "Could not open the receipt for printing. Please try again."
          : "Could not generate the PDF. Please try again.",
      );
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div
      className={
        mode === "print" ? "flex flex-col items-end" : "flex flex-col items-end"
      }
    >
      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className={
          mode === "print"
            ? "flex shrink-0 items-center bg-primary text-white py-2 px-4 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
            : "flex items-center bg-pale cursor-pointer py-3 px-6 rounded-xl disabled:cursor-not-allowed disabled:opacity-70"
        }
      >
        {mode === "print" ? (
          <Printer className="mr-2" />
        ) : (
          <FileText className="mr-2" />
        )}
        <span className="font-bold">
          {downloading
            ? mode === "print"
              ? "Preparing..."
              : "Generating PDF..."
            : mode === "print"
              ? "Print Receipt"
              : "Download PDF"}
        </span>
      </button>
      {error && (
        <p className="mt-2 text-right text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
