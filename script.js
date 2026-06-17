// قاعدة البيانات الجغرافية الشاملة لكافة مناطق ومحافظات المملكة العربية السعودية (13 منطقة)
const SaudiRegionsData = {
    "الرياض": ["مدينة الرياض", "الخرج", "المجمعة", "الدرعية", "الدوادمي", "الزلفي", "شقراء", "وادي الدواسر", "القويعية", "الأفلاج", "حوطة بني تميم", "عفيف", "الغاط", "المرئية", "ثادق", "حريملاء", "الحريق", "مرات", "الرين", "السليل"],
    "مكة المكرمة": ["مدينة مكة", "جدة", "الطائف", "القنفذة", "الليث", "رابغ", "خليص", "خرمة", "تربة", "رنية", "الكامل", "المويه", "ميسان", "أضم", "العرضيات", "بحرة"],
    "المدينة المنورة": ["مدينة المدينة", "ينبع", "العلا", "مهد الذهب", "الحناكية", "بدر", "خيبر", "العيص", "وادي الفرع"],
    "القصيم": ["بريدة", "عنيزة", "الرس", "المذنب", "البكيرية", "البدائع", "الأسياح", "النبهانية", "الشماسية", "عيون الجواء", "رياض الخبراء", "عقلة الصقور", "ضرية"],
    "المنطقة الشرقية": ["الدمام", "الخبر", "الظهران", "الأحساء", "حفر الباطن", "الجبيل", "القطيف", "الخفجي", "النعيرية", "بقيق", "قرية العليا", "رأس تنورة", "العديد", "البيضاء"],
    "عسير": ["أبها", "خميس مشيط", "بيشة", "محايل عسير", "بارق", "رجال المع", "النماص", "تنومة", "ظهران الجنوب", "تثليث", "سراة عبيدة", "أحد رفيدة", "المجاردة", "بلقرن", "طريب", "البرك"],
    "تبوك": ["مدينة تبوك", "الوجه", "ضبا", "تيماء", "أملج", "حقل", "البدع"],
    "حائل": ["مدينة حائل", "بقعاء", "الغزالة", "الشنان", "الشملي", "سميراء", "موقق", "الحائط", "السليمي"],
    "الحدود الشمالية": ["عرعر", "رفحاء", "طريف", "العويقيلة"],
    "جازان": ["مدينة جازان", "صبيا", "أبو عريش", "صامطة", "الدرب", "بيش", "أحد المسارحة", "العارضة", "ضمد", "العيدابي", "الريث", "فرسان", "الداير", "الحرث", "الهروب", "فيفاء", "الطوال"],
    "نجران": ["مدينة نجران", "شرورة", "حبونا", "بدر الجنوب", "يدمة", "ثار", "خباش", "الخرخير"],
    "الباحة": ["مدينة الباحة", "بلجرشي", "المندق", "المخواة", "قلوة", "العقيق", "القرى", "الحجرة", "بني حسن", "غمد الزناد"],
    "الجوف": ["سكاكا", "القريات", "دومة الجندل", "طبرجل"]
};

document.addEventListener("DOMContentLoaded", function() {
    const regionSelect = document.getElementById("region");
    const citySelect = document.getElementById("city");
    const careForm = document.getElementById("careForm");

    // تحديث وتعبئة قائمة المحافظات تلقائياً عند تغيير المنطقة
    regionSelect.addEventListener("change", function() {
        const selectedRegion = regionSelect.value;
        
        // إعادة تهيئة القائمة الثانية
        citySelect.innerHTML = '<option value="" disabled selected>اختر المحافظة / المدينة...</option>';
        
        if (SaudiRegionsData[selectedRegion]) {
            citySelect.disabled = false;
            
            // ترتيب المحافظات أبجدياً قبل عرضها لتسهيل البحث على العميل
            const sortedCities = SaudiRegionsData[selectedRegion].sort((a, b) => a.localeCompare(b, 'ar'));
            
            sortedCities.forEach(function(city) {
                const option = document.createElement("option");
                option.value = city;
                option.text = city;
                citySelect.appendChild(option);
            });
        } else {
            citySelect.disabled = true;
        }
    });

        // معالجة البيانات وإرسالها المباشر لرقم الواتساب
    careForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const parentName = document.getElementById("parentName").value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const patientAge = document.getElementById("patientAge").value; // سحب العمر هنا
        const serviceType = document.getElementById("serviceType").value;
        const region = document.getElementById("region").value;
        const city = document.getElementById("city").value;
        const conditionDescription = document.getElementById("conditionDescription").value;

        // صياغة نص الرسالة الاحترافي للواتساب بعد إضافة العمر
        const whatsappMessage = `*طلب خدمة رعاية منزلية جديدة - التيسير كير* \n\n` +
                                `👤 *اسم ولي الأمر:* ${parentName}\n` +
                                `🚻 *نوع الحالة:* ${gender}\n` +
                                `🎂 *عمر الحالة:* ${patientAge} سنة\n` +
                                `💼 *نوع الخدمة:* ${serviceType}\n` +
                                `📍 *المنطقة الإدارية:* منطقة ${region}\n` +
                                `🏙️ *المحافظة/المدينة:* ${city}\n\n` +
                                `📝 *وصف الحالة ومتطلباتها:* \n${conditionDescription}`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // رابط الإرسال المباشر للرقم الخاص بالمنصة
        const whatsappURL = `https://wa.me/966501439874?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    });

});
