const httpErrors = {
  400: "استعلام غير صحيح يرجى التأكد من البيانات المدخلة",
  401: "غير مصرح لك بالدخول لهذه الصفحة يرجى مراسلة الادارة",
  403: "محضور من الدخول لهذه الصفحة يرجى مراسلة الادارة",
  404: "لا توجد بيانات لعرضها",
  405: "استعلام غير مسموح",
  406: "استعلام غير مقبول",
  408: "انتهت مهلة الطلب",
  409: "تعارض في البيانات المدخلة",
  423: "تم حظر حسابك يرجى التواصل مع الادارة",
  500: "خطأ في الخادم الداخلي",
  502: "خطأ في الخادم الرئيسي",
  503: "الخدمة غير متاحة",
  504: "الخادم الرئيسي لا يستجيب",
};

const translateErrors = (req, res, next) => {
  res.errorText = function (errorCode) {
    if (httpErrors[errorCode]) {
      return httpErrors[errorCode];
    } else {
      return "حدث خطأ ما"; // Default error message
    }
  };
  next();
};

export default translateErrors;