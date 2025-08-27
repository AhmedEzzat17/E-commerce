import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CartWishlistContext } from "../App";
import "../index.css";

const PaymentmMethod = () => {
  // حالة نافذة الدفع عند الاستلام
  const [showCashModal, setShowCashModal] = useState(false);
  const [cashPhone, setCashPhone] = useState("");
  const [cashAddress, setCashAddress] = useState("");
  const [cashNote, setCashNote] = useState("");
  const [cashFormError, setCashFormError] = useState("");
  // جلب قيمة السلة من السياق
  const { cartItems } = useContext(CartWishlistContext);
  const location = useLocation();
  const product = location.state?.product;
  const paymentNumber = "01012345678";
  const bankNumber = "0123456789";
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankImage, setBankImage] = useState(null);
  const [bankImageError, setBankImageError] = useState("");
  const [showCashMsg, setShowCashMsg] = useState(false);
  const [cashStep, setCashStep] = useState(0); // 0: default, 1: موافق, 2: رسالة تأكيد
  const [bankStep, setBankStep] = useState(0);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [cashPhoneWarning, setCashPhoneWarning] = useState("");
  const [cashAddressWarning, setCashAddressWarning] = useState("");
  const [cashFormSubmitted, setCashFormSubmitted] = useState(false);

  const [bankPhone, setBankPhone] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [bankNote, setBankNote] = useState("");

  const [bankPhoneWarning, setBankPhoneWarning] = useState("");
  const [bankAddressWarning, setBankAddressWarning] = useState("");
  const [bankFormSubmitted, setBankFormSubmitted] = useState(false);

  function saveProductNote(productId, note) {
    const notes = JSON.parse(localStorage.getItem("cartNotes") || "{}");
    notes[productId] = note;
    localStorage.setItem("cartNotes", JSON.stringify(notes));
  }

  // دالة لجلب السعر كرقم
  const getPrice = (item) => {
    let price = item.price ?? item.unitPrice ?? 0;
    if (typeof price === "string") price = parseFloat(price);
    if (isNaN(price)) price = 0;
    return price;
  };
  // إذا وصل منتج من التنقل، استخدم سعره فقط
  const total = product
    ? getPrice(product) * (product.quantity || 1)
    : cartItems.reduce(
        (acc, item) => acc + getPrice(item) * (item.quantity || 1),
        0
      );

  const handleBankClick = () => {
    setShowBankModal(true);
    setBankImageError("");
  };

  // إغلاق النافذة عند الضغط خارجها
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleCloseModal();
    }
  };

  const handleCashClick = () => {
    setShowCashModal(true);
    setCashStep(0);
    setCashPhone("");
    setCashAddress("");
    setCashNote("");
    setCashFormError("");
  };

  const handleCloseModal = () => {
    setShowBankModal(false);
    setBankImage(null);
    setBankImageError("");
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBankImage(e.target.files[0]);
      setBankImageError("");
    }
  };

  const handleBankSubmit = (e) => {
    e.preventDefault();
    setBankFormSubmitted(true);

    let valid = true;

    if (!bankImage) {
      setBankImageError("يجب رفع صورة التحويل البنكي");
      valid = false;
    } else {
      setBankImageError("");
    }

    if (!bankPhone.trim()) {
      setBankPhoneWarning("يرجى إدخال رقم الهاتف");
      valid = false;
    } else if (bankPhone.length < 11 || bankPhone.length > 12) {
      setBankPhoneWarning("رقم الهاتف يجب أن يكون من 11 إلى 12 رقمًا.");
      valid = false;
    } else {
      setBankPhoneWarning("");
    }

    if (!bankAddress.trim()) {
      setBankAddressWarning("يرجى إدخال العنوان");
      valid = false;
    } else if (bankAddress.trim().length < 5) {
      setBankAddressWarning("العنوان يجب أن يحتوي على 5 حروف على الأقل.");
      valid = false;
    } else {
      setBankAddressWarning("");
    }

    if (!valid) return;

    setShowBankModal(false);
    setBankStep(1);
  };

  useEffect(() => {
    let interval;
    if (cashStep === 2) {
      window.scrollTo(0, 0);
      setCountdown(5); // نعيد التهيئة كل مرة
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            navigate("/");
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cashStep, navigate]);

  useEffect(() => {
    let interval;
    if (bankStep === 1) {
      window.scrollTo(0, 0);
      setCountdown(5);
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            navigate("/");
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [bankStep, navigate]);

  return (
    <div className="payment-container">
      <div className="payment-box wide">
        <h2 className="main-title">إتمام عملية الدفع</h2>
        <p className="desc-text">
          إجمالي قيمة الطلب:{" "}
          <span className="total">{total.toFixed(2)} ر.س</span>
        </p>
        <p className="desc-text">
          يرجى تحويل المبلغ إلى رقم الحساب التالي:
          <span className="pay-number"> {paymentNumber} </span>
        </p>
        <div className="payment-options row">
          <div className="option">
            {cashStep === 0 && bankStep === 0 && !showCashModal && (
              <button className="pay-btn cash" onClick={handleCashClick}>
                الدفع عند الاستلام
              </button>
            )}

            {showCashModal && (
              <div
                className="modal-overlay"
                onClick={(e) => {
                  if (e.target.classList.contains("modal-overlay")) {
                    setShowCashModal(false);
                    setCashFormError("");
                  }
                }}
              >
                <div
                  className="modal-content wide-modal"
                  style={{ position: "relative" }}
                >
                  <button
                    className="modal-close-x"
                    style={{ left: "18px", top: "18px", position: "absolute" }}
                    onClick={() => {
                      setShowCashModal(false);
                      setCashFormError("");
                    }}
                    title="إغلاق النافذة"
                  >
                    &#10006;
                  </button>
                  <h3
                    style={{
                      color: "var(--primary-color)",
                      fontWeight: "bold",
                    }}
                  >
                    الدفع عند الاستلام
                  </h3>
                  <form
                    className="bank-form"
                    style={{ marginTop: "1.2rem" }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setCashFormSubmitted(true); // المستخدم ضغط "موافق"

                      // تحقق من صحة المدخلات
                      let valid = true;

                      if (!cashPhone.trim()) {
                        setCashPhoneWarning("يرجى إدخال رقم الهاتف");
                        valid = false;
                      } else if (
                        cashPhone.length < 11 ||
                        cashPhone.length > 12
                      ) {
                        setCashPhoneWarning(
                          "رقم الهاتف يجب أن يكون من 11 إلى 12 رقمًا."
                        );
                        valid = false;
                      } else {
                        setCashPhoneWarning("");
                      }

                      if (!cashAddress.trim()) {
                        setCashAddressWarning("يرجى إدخال العنوان");
                        valid = false;
                      } else if (cashAddress.trim().length < 5) {
                        setCashAddressWarning(
                          "العنوان يجب أن يحتوي على 5 حروف على الأقل."
                        );
                        valid = false;
                      } else {
                        setCashAddressWarning("");
                      }

                      if (!valid) return;

                      // إذا كل شيء تمام
                      setCashFormError("");
                      setShowCashModal(false);
                      setCashStep(2);
                    }}
                  >
                    <div
                      style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
                    >
                      <div style={{ flex: 1 }}>
                        <label htmlFor="cash-phone">
                          رقم الهاتف{" "}
                          <span className="required-red">(إجباري)</span>
                        </label>
                        <input
                          type="number"
                          id="cash-phone"
                          value={cashPhone}
                          onChange={(e) => {
                            const value = e.target.value;
                            setCashPhone(value);
                            if (value.length < 11 || value.length > 12) {
                              setCashPhoneWarning(
                                "رقم الهاتف يجب أن يكون من 11 إلى 12 رقمًا."
                              );
                            } else {
                              setCashPhoneWarning("");
                            }
                          }}
                          required
                          style={{
                            borderRadius: "8px",
                            padding: "10px",
                            border: "1px solid #ccc",
                            width: "100%",
                          }}
                          placeholder="أدخل رقم الهاتف هنا"
                        />
                        {cashFormSubmitted && cashPhoneWarning && (
                          <div className="error-message">
                            {cashPhoneWarning}
                          </div>
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <label htmlFor="cash-address">
                          العنوان <span className="required-red">(إجباري)</span>
                        </label>
                        <input
                          type="text"
                          id="cash-address"
                          value={cashAddress}
                          onChange={(e) => {
                            const value = e.target.value;
                            setCashAddress(value);
                            if (value.trim().length < 5) {
                              setCashAddressWarning(
                                "العنوان يجب أن يحتوي على 5 حروف على الأقل."
                              );
                            } else {
                              setCashAddressWarning("");
                            }
                          }}
                          required
                          style={{
                            borderRadius: "8px",
                            padding: "10px",
                            border: "1px solid #ccc",
                            width: "100%",
                          }}
                          placeholder="أدخل العنوان هنا"
                        />
                        {cashFormSubmitted && cashAddressWarning && (
                          <div className="error-message">
                            {cashAddressWarning}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ marginTop: "1.2rem" }}>
                      <label htmlFor="cash-note">أضف ملاحظتك هنا</label>
                      <textarea
                        id="cash-note"
                        value={cashNote}
                        onChange={(e) => {
                          const note = e.target.value;
                          setCashNote(note);
                          saveProductNote("cash", note);
                        }}
                        rows={4}
                        style={{
                          borderRadius: "8px",
                          padding: "10px",
                          border: "1px solid #ccc",
                          resize: "none",
                          width: "100%",
                        }}
                        placeholder="أضف ملاحظتك هنا (اختياري)"
                      ></textarea>
                    </div>

                    {cashFormError && (
                      <div className="error-message">{cashFormError}</div>
                    )}

                    {cashPhone.trim() && cashAddress.trim() && (
                      <button
                        type="submit"
                        className="submit-btn"
                        style={{ marginTop: "10px" }}
                      >
                        موافق
                      </button>
                    )}
                  </form>
                </div>
              </div>
            )}
            {cashStep === 2 && (
              <div
                className="pay-message success"
                style={{
                  fontWeight: "bold",
                  fontSize: "1.1em",
                  color: "var(--primary-color)",
                  background: "#e6ffe6",
                  padding: "1rem",
                  marginTop: "1rem",
                }}
              >
                <div>تم استلام طلبك وسيتم الدفع عند الاستلام</div>
                <div style={{ marginTop: "0.5rem", fontSize: "0.95em" }}>
                  سيتم توجيهك تلقائيًا للصفحة الرئيسية خلال {countdown} ثانية...
                </div>
              </div>
            )}
          </div>
          <div className="option">
            {cashStep === 0 && bankStep === 0 && !showCashModal && (
              <button className="pay-btn bank" onClick={handleBankClick}>
                الدفع عبر التحويل البنكي
              </button>
            )}

            {bankStep === 1 && (
              <div
                className="pay-message success"
                style={{
                  fontWeight: "bold",
                  fontSize: "1.1em",
                  color: "var(--primary-color)",
                  background: "#e6ffe6",
                  padding: "1rem",
                  marginTop: "1rem",
                }}
              >
                <div>تم استلام بيانات التحويل بنجاح وسيتم مراجعتها</div>
                <div style={{ marginTop: "0.5rem", fontSize: "0.95em" }}>
                  سيتم توجيهك تلقائيًا للصفحة الرئيسية خلال {countdown} ثانية...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* نافذة البنك */}
      {showBankModal && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content wide-modal bank-modal">
            <button
              className="modal-close-x"
              onClick={handleCloseModal}
              title="إغلاق النافذة"
            >
              &#10006;
            </button>
            <h3>الدفع عبر التحويل البنكي</h3>
            <div
              className="order-total-modal"
              style={{
                margin: "1rem 0",
                fontWeight: "bold",
                fontSize: "1.15em",
              }}
            >
              إجمالي قيمة الطلب:{" "}
              <span className="total">{total.toFixed(2)} ر.س</span>
            </div>
            <p className="desc-text">
              يرجى تحويل قيمة الطلب إلى رقم الحساب التالي:
              <span className="bank-number"> {bankNumber} </span>
            </p>
            <form onSubmit={handleBankSubmit} className="bank-form">
              <label htmlFor="bank-image" style={{ marginBottom: "0.5rem" }}>
                صورة إيصال التحويل{" "}
                <span className="required-red">(إجباري)</span>
              </label>
              <div style={{ position: "relative", marginBottom: "1rem" }}>
                <input
                  type="file"
                  id="bank-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="bank-image"
                  className="upload-label"
                  style={{
                    display: "block",
                    padding: "12px",
                    border: "2px dashed #aaa",
                    borderRadius: "10px",
                    textAlign: "center",
                    background: "#f9f9f9",
                    cursor: "pointer",
                    fontSize: "1.05rem",
                    transition: "background 0.2s",
                  }}
                >
                  اضغط هنا لاختيار صورة الإيصال
                </label>
              </div>

              {bankImageError && (
                <div className="error-message">{bankImageError}</div>
              )}

              {/* عرض الصورة بعد الاختيار */}
              {bankImage && (
                <div
                  style={{
                    position: "relative",
                    marginTop: "1rem",
                    display: "inline-block",
                    maxWidth: "100%",
                  }}
                >
                  <img
                    src={URL.createObjectURL(bankImage)}
                    alt="الإيصال"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "220px",
                      borderRadius: "12px",
                      border: "2px solid #ccc",
                      objectFit: "cover",
                    }}
                  />
                  <button
                    onClick={() => setBankImage(null)}
                    style={{
                      position: "absolute",
                      top: "-25px",
                      left: "-10px",
                      color: "#000",
                      background: "none",
                      border: "none",
                      borderRadius: "50%",
                      width: "35px",
                      height: "35px",
                      fontSize: "2.5rem",
                      cursor: "pointer",
                    }}
                    title="حذف الصورة"
                  >
                    ×
                  </button>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                  marginTop: "1.2rem",
                }}
              >
                <div style={{ flex: 1 }}>
                  <label htmlFor="bank-phone">
                    رقم الهاتف <span className="required-red">(إجباري)</span>
                  </label>
                  <input
                    type="number"
                    id="bank-phone"
                    value={bankPhone}
                    onChange={(e) => {
                      const value = e.target.value;
                      setBankPhone(value);
                      if (value.length < 11 || value.length > 12) {
                        setBankPhoneWarning(
                          "رقم الهاتف يجب أن يكون من 11 إلى 12 رقمًا."
                        );
                      } else {
                        setBankPhoneWarning("");
                      }
                    }}
                    required
                    style={{
                      borderRadius: "8px",
                      padding: "10px",
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                    placeholder="أدخل رقم الهاتف"
                  />
                  {bankFormSubmitted && bankPhoneWarning && (
                    <div className="error-message">{bankPhoneWarning}</div>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <label htmlFor="bank-address">
                    العنوان <span className="required-red">(إجباري)</span>
                  </label>
                  <input
                    type="text"
                    id="bank-address"
                    value={bankAddress}
                    onChange={(e) => {
                      const value = e.target.value;
                      setBankAddress(value);
                      if (value.trim().length < 5) {
                        setBankAddressWarning(
                          "العنوان يجب أن يحتوي على 5 حروف على الأقل."
                        );
                      } else {
                        setBankAddressWarning("");
                      }
                    }}
                    required
                    style={{
                      borderRadius: "8px",
                      padding: "10px",
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                    placeholder="أدخل العنوان"
                  />
                  {bankFormSubmitted && bankAddressWarning && (
                    <div className="error-message">{bankAddressWarning}</div>
                  )}
                </div>
              </div>

              <div style={{ marginTop: "1.2rem" }}>
                <label htmlFor="bank-note">ملاحظات إضافية</label>
                <textarea
                  id="bank-note"
                  value={bankNote}
                  onChange={(e) => {
                    const note = e.target.value;
                    setBankNote(note);
                    saveProductNote("bank", note); // "bank" ممكن تستخدمه كـ ID ثابت للدفع البنكي
                  }}
                  rows={4}
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    resize: "none",
                    width: "100%",
                  }}
                  placeholder="أضف ملاحظتك هنا (اختياري)"
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                إرسال الإيصال
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ستايلات داخلية لسهولة التجربة */}
      <style>{`
							.payment-container {
								min-height: 100vh;
								display: flex;
								align-items: center;
								justify-content: center;
								background: #f7f7f7;
							}
							.payment-box.wide {
								background: #fff;
								padding: 3.5rem 3.5rem;
								border-radius: 32px;
								box-shadow: 0 6px 48px rgba(95,169,169,0.13);
								max-width: 950px;
								width: 100%;
								text-align: center;
								border: 2.5px solid var(--accent-color);
								transition: box-shadow 0.3s, border-color 0.3s;
							}
							.payment-box.wide:hover {
								box-shadow: 0 12px 60px rgba(64,124,124,0.22);
								border-color: var(--primary-color);
							}
							.main-title {
								font-size: 2.3em;
								font-weight: 700;
								color: var(--primary-color);
								margin-bottom: 1.2rem;
							}
							.desc-text {
								font-size: 1.15em;
								color: #222;
								margin-bottom: 1.1rem;
							}
							.total {
								font-weight: bold;
								color: var(--primary-color);
								font-size: 1.3em;
							}
							.pay-number, .bank-number {
								font-weight: bold;
								color: var(--accent-color);
								font-size: 1.15em;
							}
							.payment-options.row {
								margin-top: 2.5rem;
								display: flex;
								flex-direction: row;
								gap: 3.5rem;
								justify-content: center;
							}
							.option {
								display: flex;
								flex-direction: column;
								align-items: center;
								min-width: 260px;
							}
							.pay-btn {
								padding: 1.2rem 3.2rem;
								border: none;
								border-radius: 16px;
								font-size: 1.15rem;
								cursor: pointer;
								margin-bottom: 0.9rem;
								background: var(--accent-color);
								color: #fff;
								font-weight: 700;
								box-shadow: 0 2px 12px rgba(95,169,169,0.10);
								transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s;
							}
							.pay-btn.cash {
								background: var(--primary-color);
							}
							.pay-btn.bank {
								background: var(--accent-color);
							}
							.pay-btn:hover {
								background: #fff;
								color: var(--primary-color);
								border: 2px solid var(--primary-color);
								transform: translateY(-2px) scale(1.05);
							}
							.pay-message.success {
								background: rgba(64,124,124,0.10);
								color: var(--primary-color);
								padding: 0.9rem 1.5rem;
								border-radius: 10px;
								font-size: 1.05rem;
								font-weight: 500;
								margin-top: 0.5rem;
							}
							/* Modal styles */
							.modal-overlay {
								position: fixed;
								top: 0; left: 0; right: 0; bottom: 0;
								background: rgba(0,0,0,0.2);
								display: flex;
								align-items: center;
								justify-content: center;
								z-index: 1000;
							}
							.modal-content.wide-modal {
								background: #fff;
								padding: 2.5rem 2.5rem;
								border-radius: 24px;
								box-shadow: 0 4px 32px rgba(95,169,169,0.14);
								max-width: 800px;
                overflow-x: hidden;
								width: 100%;
								text-align: center;
								border: 2.5px solid var(--accent-color);
								position: relative;
							}
							.modal-content.wide-modal.bank-modal.bank-modal {
                height: 600px;
							}
							.modal-close-x {
								position: absolute;
								top: 18px;
								left: 18px;
								background: transparent;
								border: none;
                color: var(--primary-color);
								font-size: 1.7em;
								cursor: pointer;
								z-index: 10;
								transition: color 0.2s;
              }
              .modal-close-x:hover {
                color: #dc3545;
							}
							.modal-content h3 {
								color: var(--primary-color);
								font-size: 1.5em;
								font-weight: 700;
							}
							.bank-form {
								display: flex;
								flex-direction: column;
								gap: 1.2rem;
								margin-top: 1.2rem;
							}
                .bank-image img{
                display: block;
                max-width: 100%;
                border-radius: 12px;
                margin: 1rem auto 0;
                border: 2px solid #ccc;
                }
							.bank-form label {
								font-size: 1.08em;
								color: #222;
								font-weight: 500;
							}
							.required-red {
								color: #dc3545;
								font-weight: bold;
							}
							.submit-btn {
								background: var(--primary-color);
								color: #fff;
								border: none;
								border-radius: 10px;
								padding: 0.9rem 2.2rem;
								cursor: pointer;
								font-size: 1.08rem;
								font-weight: 700;
								transition: background 0.2s, color 0.2s;
							}
							.submit-btn:hover {
								background: var(--accent-color);
								color: #fff;
							}
                .bank-form .upload-label:hover {
                  background: var(--primary-color)!important;
                  color: #fff !important;
                }
							.close-btn {
								background: #f8d7da;
								color: #721c24;
								border: none;
								border-radius: 10px;
								padding: 0.9rem 2.2rem;
								cursor: pointer;
								font-size: 1.08rem;
								font-weight: 700;
							}
							.close-btn:hover {
								background: #dc3545;
								color: #fff;
							}
							.error-message {
								color: #dc3545;
								font-size: 1rem;
							}
							@media (max-width: 1200px) {
								.payment-box.wide {
									max-width: 98vw;
									padding: 2rem 0.5rem;
								}
								.payment-options.row {
									flex-direction: column;
									gap: 1.5rem;
								}
								.option {
									min-width: unset;
								}
								.modal-content.wide-modal {
									max-width: 98vw;
									padding: 1.2rem 0.5rem;
								}
							}
							@media (max-width: 600px) {
								.main-title {
									font-size: 1.3em;
								}
								.desc-text {
									font-size: 1em;
								}
								.payment-box.wide {
									padding: 1rem 0.2rem;
									border-radius: 16px;
								}
								.modal-content.wide-modal {
									padding: 1rem 0.2rem;
									border-radius: 16px;
								}
								.modal-close-x {
									top: 10px;
									left: 10px;
									font-size: 1.3em;
								}
							}
						`}</style>
    </div>
  );
};

export default PaymentmMethod;
