import { getGlobal } from "../../lib/getGlobal";
import Header from "../../components/common/Navbar";
import Footer from "../../components/layout/Footer";

export default async function SiteLayout({
  children,
  pageLayout,
}: {
  children: React.ReactNode;
  pageLayout?: any;
}) {
  let global = null;

  try {
    global = await getGlobal();
  } catch (err) {
    console.error("Global API failed:", err);
  }

  // 🚫 If API fails → block page (your requirement)
  if (!global) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>🚫 Site temporarily unavailable</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  const showHeader = pageLayout?.showHeader ?? true;
  const showFooter = pageLayout?.showFooter ?? true;

  return (
    <>
      {showHeader && <Header headerData={global.header} />}
      {children}
      {showFooter && <Footer footer={global.footer} />}
    </>
  );
}