import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  VaultAccount,
  mockVaultAccount,
  ClientProfile,
  mockClientProfile,
} from "@/lib/types";
import { DollarSign, UserCircle } from "lucide-react";

// In a real app, this data would be fetched or passed as props
const vaultAccountData: VaultAccount = mockVaultAccount;
const clientProfileData: ClientProfile = mockClientProfile;

export default function AccountOverview() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Account Overview</CardTitle>
        <CardDescription>
          Summary of your vault account and profile status.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Balance
              </CardTitle>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: vaultAccountData.currency }).format(vaultAccountData.balance)}
              </div>
              <p className="text-xs text-muted-foreground pt-1">
                Last updated: {new Date(vaultAccountData.lastUpdated).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Holder</CardTitle>
              <UserCircle className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold">{clientProfileData.name}</div>
              <p className="text-xs text-muted-foreground pt-1">
                Member since: {new Date(clientProfileData.joinedDate).toLocaleDateString()}
              </p>
              <p className="text-xs text-muted-foreground">
                {clientProfileData.email}
              </p>
            </CardContent>
          </Card>
        </div>
        {/* You can add more overview cards here, e.g., for recent performance or quick actions */}
      </CardContent>
    </Card>
  );
}
