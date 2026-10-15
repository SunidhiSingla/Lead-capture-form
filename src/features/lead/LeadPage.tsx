import LeadForm from "./LeadForm";
import styles from "./LeadPage.module.css";

export default function LeadPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.content}>
          <section className={styles.formCard} aria-labelledby="form-title">
            <div className={styles.cardHeader}>
              <div>
                <h1 id="form-title">Tell us about yourself</h1>
                <p className={styles.cardDescription}>Fields marked <span>*</span> are required.</p>
              </div>
            </div>
            <LeadForm />
          </section>
        </section>
      </div>
    </main>
  );
}