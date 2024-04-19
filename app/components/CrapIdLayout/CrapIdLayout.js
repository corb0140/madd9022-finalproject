"use client";

import styles from "./CrapIdLayout.module.css";
import Image from "next/image";
import { getSessions, makeSuggestion } from "@/app/actions";
import { useEffect, useState } from "react";
import { useRouter, redirect } from "next/navigation";

const CrapIdLayout = ({ data, owner }) => {
  const router = useRouter();

  const crap = data.data;
  const [notOwner, setNotOwner] = useState(true);

  if (!crap) {
    redirect("/error");
  }

  useEffect(() => {
    if (crap.owner._id !== owner) {
      return;
    } else {
      setNotOwner(false);
    }
  }, [owner, crap.owner._id]);

  const base =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://madd9022-finalproject.vercel.app/";

  // DELETE FUNCTION
  const deleteCrap = async () => {
    const token = await getSessions();

    await fetch(`${base}api/crapId?token=${token?.value}&id=${crap._id}`, {
      method: "DELETE",
    });

    return router.push("/mine");
  };

  // INTERESTED FUNCTION
  const interested = async () => {
    const token = await getSessions();

    await fetch(`${base}api/crapId?token=${token?.value}&id=${crap._id}`, {
      method: "POST",
    });

    router.refresh();
  };

  //AGREED FUNCTION
  const agree = async () => {
    const token = await getSessions();

    await fetch(`${base}api/agree?token=${token?.value}&id=${crap._id}`, {
      method: "POST",
    });

    router.refresh();
  };

  //DISAGREED FUNCTION
  const disagree = async () => {
    const token = await getSessions();

    await fetch(`${base}api/disagree?token=${token?.value}&id=${crap._id}`, {
      method: "POST",
    });

    router.refresh();
  };

  //FLUSHED FUNCTION
  const flushed = async () => {
    const token = await getSessions();

    await fetch(`${base}api/flush?token=${token?.value}&id=${crap._id}`, {
      method: "POST",
    });

    router.push("/wiped");
  };

  return (
    <div>
      {/* DISPLAY FORM OR INTEREST BUTTON BASED ON BUYER OR SELLER */}
      <div className={styles.container}>
        {notOwner ? (
          <>
            {/* IF AVAILABLE, SHOW INTERESTED BUTTON */}
            {crap.status === "AVAILABLE" && (
              <div>
                <p className={styles.suggestionText}>
                  Are you interested in this crap? Click the button below
                </p>
                <button className={styles.interestBtn} onClick={interested}>
                  INTERESTED
                </button>
              </div>
            )}

            {/* SHOW AGREE & DISAGREE BUTTONS IF CRAP IS SCHEDULED */}
            <div>
              {crap.status === "SCHEDULED" && (
                <div className={styles.scheduledContainer}>
                  <p className={styles.suggestionText}>
                    Address: {crap.suggestion.address}
                  </p>
                  <p className={styles.suggestionText}>
                    Date: {crap.suggestion.date.split("T")[0]}
                  </p>
                  <p className={styles.suggestionText}>
                    Time: {crap.suggestion.time}
                  </p>

                  <div className={styles.btnContainer}>
                    <button className={styles.agreeBtn} onClick={agree}>
                      Agree
                    </button>
                    <button className={styles.disagreeBtn} onClick={disagree}>
                      Disagree
                    </button>
                  </div>
                </div>
              )}

              {/* IF AGREED, SHOW MESSAGE AND PICKUP INFORMATION */}
              {crap.status === "AGREED" && (
                <>
                  <h2>Thank you for taking my crap</h2>
                  <div>
                    <p className={styles.suggestionText}>
                      Address: {crap.suggestion.address}
                    </p>
                    <p className={styles.suggestionText}>
                      Date: {crap.suggestion.date.split("T")[0]}
                    </p>
                    <p className={styles.suggestionText}>
                      Time: {crap.suggestion.time}
                    </p>
                  </div>
                </>
              )}

              {/* WAIT MESSAGE IF INTERESTED */}
              {crap.status === "INTERESTED" && (
                <p className={styles.suggestionText}>
                  Waiting for seller to respond
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            {/* IF STATUS INTERESTED, DISPLAY FORM.*/}
            {crap.status === "INTERESTED" && (
              <form className={styles.form} action={makeSuggestion}>
                <input type="hidden" name="id" value={crap._id} />
                <div className={styles.formBox}>
                  <label className={styles.label} htmlFor="address">
                    Pickup Address:
                  </label>
                  <input
                    className={styles.inputField}
                    type="text"
                    placeholder="address"
                    name="address"
                    required
                  />
                </div>
                <div className={styles.formBox}>
                  <label className={styles.label} htmlFor="date">
                    Pickup Date:
                  </label>
                  <input
                    className={styles.inputField}
                    type="date"
                    name="date"
                    required
                  />
                </div>
                <div className={styles.formBox}>
                  <label className={styles.label} htmlFor="time">
                    Pickup Time:
                  </label>
                  <input
                    className={styles.inputField}
                    type="time"
                    name="time"
                    required
                  />
                </div>

                <div className={styles.formBox}>
                  <button className={styles.submit} type="submit">
                    Suggest pickup time and location
                  </button>
                </div>
              </form>
            )}

            {/* IF STATUS IS SCHEDULED, DISPLAY SUGGESTION DATA */}
            {crap.status === "SCHEDULED" && (
              <div>
                <p className={styles.suggestionText}>
                  Address: {crap.suggestion.address}
                </p>
                <p className={styles.suggestionText}>
                  Date: {crap.suggestion.date.split("T")[0]}
                </p>
                <p className={styles.suggestionText}>
                  Time: {crap.suggestion.time}
                </p>
              </div>
            )}

            {/* IF STATUS IS AGREED, DISPLAY FLUSHED BUTTON */}
            {crap.status === "AGREED" && (
              <div>
                <button className={styles.flushBtn} onClick={flushed}>
                  Flush this crap
                </button>
              </div>
            )}
          </>
        )}

        {/* MESSAGE WHEN PRODUCT IS AVAILABLE */}
        {!notOwner && crap.status === "AVAILABLE" && (
          <div>
            <p>No one has shown interested in this crap</p>
          </div>
        )}

        {/* CRAP CARD */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            {crap.title} - [{crap.status}]
          </div>

          <div className={styles.cardContent}>{crap.description}</div>

          <div className={styles.imageBox}>
            <Image
              className={styles.image}
              src={crap.images[0]}
              alt={crap.title}
              width={500}
              height={500}
              style={{ objectFit: "cover" }}
            />
          </div>

          {notOwner ? (
            "Only the owner can delete this crap."
          ) : (
            <div>
              <button className={styles.delete} onClick={deleteCrap}>
                Delete this crap
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrapIdLayout;
