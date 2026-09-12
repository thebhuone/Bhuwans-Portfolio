Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$out = Join-Path (Split-Path $PSScriptRoot -Parent) 'public\Bhuwan_Bhandari_CV.docx'

function X([string]$s) {
  [System.Security.SecurityElement]::Escape($s)
}

function ContactLine {
  @'
  <w:p>
    <w:pPr><w:pStyle w:val="Contact"/></w:pPr>
    <w:r><w:t xml:space="preserve">Kathmandu / Lalitpur, Nepal</w:t></w:r>
    <w:r><w:t xml:space="preserve"> | </w:t></w:r>
    <w:hyperlink r:id="rIdPhone"><w:r><w:rPr><w:color w:val="0D5C9B"/><w:u w:val="single"/></w:rPr><w:t xml:space="preserve">+977 9807903926</w:t></w:r></w:hyperlink>
    <w:r><w:t xml:space="preserve"> | </w:t></w:r>
    <w:hyperlink r:id="rIdMail"><w:r><w:rPr><w:color w:val="0D5C9B"/><w:u w:val="single"/></w:rPr><w:t xml:space="preserve">thebhuone@gmail.com</w:t></w:r></w:hyperlink>
    <w:r><w:t xml:space="preserve"> | </w:t></w:r>
    <w:hyperlink r:id="rIdLinkedIn"><w:r><w:rPr><w:color w:val="0D5C9B"/><w:u w:val="single"/></w:rPr><w:t xml:space="preserve">linkedin.com/in/bhuone99</w:t></w:r></w:hyperlink>
    <w:r><w:t xml:space="preserve"> | </w:t></w:r>
    <w:hyperlink r:id="rIdPortfolio"><w:r><w:rPr><w:color w:val="0D5C9B"/><w:u w:val="single"/></w:rPr><w:t xml:space="preserve">bhuwanbhandari.com</w:t></w:r></w:hyperlink>
  </w:p>
'@
}

$documentBody = @"
<w:p><w:pPr><w:pStyle w:val="Title"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="36"/><w:color w:val="102F4B"/></w:rPr><w:t xml:space="preserve">BHUWAN BHANDARI</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Subtitle"/></w:pPr><w:r><w:t xml:space="preserve">SENIOR SYSTEM ADMINISTRATOR | DEVOPS ENGINEER | CLOUD &amp; INFRASTRUCTURE ENGINEER</w:t></w:r></w:p>
$(ContactLine)
<w:p><w:pPr><w:pStyle w:val="Section"/></w:pPr><w:r><w:t xml:space="preserve">PROFESSIONAL SUMMARY</w:t></w:r></w:p>
<w:p><w:r><w:t xml:space="preserve">Senior System Administrator and DevOps Engineer with 8+ years of hands-on experience managing production Linux and Windows environments, cloud infrastructure, virtualization, enterprise networking, CI/CD, backups, monitoring, disaster recovery, and incident response across municipal, healthcare, education, NGO, CRM, and business systems. Experienced in operating 30+ municipal server environments and supporting 50+ domains and cPanel-managed hosting platforms while maintaining uptime, security, and resilient service delivery. Skilled in Jenkins, Git, Docker, Kubernetes, Nginx, Apache, Tomcat, Gunicorn, Django, React, FortiGate, MikroTik, VPN, VLAN, proactive monitoring, automation, and documentation-driven operational excellence.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Section"/></w:pPr><w:r><w:t xml:space="preserve">CORE COMPETENCIES</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">Linux and Windows server administration, hardening, patching, and uptime management.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">Cloud, VPS, and dedicated server operations across AWS, Azure, Google Cloud, and Oracle Cloud.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">Virtualization and infrastructure operations using VMware ESXi, Proxmox VE, and Hyper-V.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">DevOps delivery with Jenkins, Git, GitLab, Docker, Kubernetes, CI/CD, and automated deployment workflows.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">Application hosting and troubleshooting for Nginx, Apache, Tomcat, Gunicorn, Django, React, Java, and Grails.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">Enterprise networking, firewalls, VPN, VLAN, routing, NAT, IP telephony, CCTV, and incident response.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">Monitoring, backup, data recovery, log analysis, capacity planning, and production DR readiness.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">Bash, Python, and PowerShell automation for recurring operational tasks and runbook improvements.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Section"/></w:pPr><w:r><w:t xml:space="preserve">TECHNICAL SKILLS</w:t></w:r></w:p>
<w:tbl>
  <w:tblPr><w:tblW w:w="0" w:type="auto"/><w:tblBorders><w:top w:val="single" w:sz="4" w:color="B8D5EA"/><w:left w:val="single" w:sz="4" w:color="B8D5EA"/><w:bottom w:val="single" w:sz="4" w:color="B8D5EA"/><w:right w:val="single" w:sz="4" w:color="B8D5EA"/><w:insideH w:val="single" w:sz="4" w:color="D8E8F4"/><w:insideV w:val="single" w:sz="4" w:color="D8E8F4"/></w:tblBorders></w:tblPr>
  <w:tr><w:tc><w:tcPr><w:shd w:val="clear" w:fill="EAF5FC"/><w:tcMar><w:left w:w="110" w:type="dxa"/><w:right w:w="110" w:type="dxa"/><w:top w:w="70" w:type="dxa"/><w:bottom w:w="70" w:type="dxa"/></w:tcMar></w:tcPr><w:p><w:r><w:t xml:space="preserve">Systems &amp; Automation</w:t></w:r></w:p></w:tc><w:tc><w:p><w:r><w:t xml:space="preserve">Linux, Ubuntu, CentOS, RHEL, Windows Server, Active Directory, Bash, Python, PowerShell, server hardening, patching, runbooks</w:t></w:r></w:p></w:tc></w:tr>
  <w:tr><w:tc><w:tcPr><w:shd w:val="clear" w:fill="EAF5FC"/><w:tcMar><w:left w:w="110" w:type="dxa"/><w:right w:w="110" w:type="dxa"/><w:top w:w="70" w:type="dxa"/><w:bottom w:w="70" w:type="dxa"/></w:tcMar></w:tcPr><w:p><w:r><w:t xml:space="preserve">DevOps &amp; Delivery</w:t></w:r></w:p></w:tc><w:tc><w:p><w:r><w:t xml:space="preserve">Jenkins, Git, GitLab, Docker, Kubernetes, CI/CD, Terraform, Ansible, Nginx, Apache, Tomcat, Gunicorn, Django, React, Java, Grails</w:t></w:r></w:p></w:tc></w:tr>
  <w:tr><w:tc><w:tcPr><w:shd w:val="clear" w:fill="EAF5FC"/><w:tcMar><w:left w:w="110" w:type="dxa"/><w:right w:w="110" w:type="dxa"/><w:top w:w="70" w:type="dxa"/><w:bottom w:w="70" w:type="dxa"/></w:tcMar></w:tcPr><w:p><w:r><w:t xml:space="preserve">Cloud &amp; Virtualization</w:t></w:r></w:p></w:tc><w:tc><w:p><w:r><w:t xml:space="preserve">AWS, Azure, Google Cloud, Oracle Cloud, EC2, S3, CloudWatch, VMware ESXi, Proxmox VE, Hyper-V, server provisioning</w:t></w:r></w:p></w:tc></w:tr>
  <w:tr><w:tc><w:tcPr><w:shd w:val="clear" w:fill="EAF5FC"/><w:tcMar><w:left w:w="110" w:type="dxa"/><w:right w:w="110" w:type="dxa"/><w:top w:w="70" w:type="dxa"/><w:bottom w:w="70" w:type="dxa"/></w:tcMar></w:tcPr><w:p><w:r><w:t xml:space="preserve">Networking &amp; Security</w:t></w:r></w:p></w:tc><w:tc><w:p><w:r><w:t xml:space="preserve">FortiGate, MikroTik, VPN, VLAN, routing, NAT, firewall management, SSL/TLS, CCTV servers, IP telephony, secure connectivity</w:t></w:r></w:p></w:tc></w:tr>
  <w:tr><w:tc><w:tcPr><w:shd w:val="clear" w:fill="EAF5FC"/><w:tcMar><w:left w:w="110" w:type="dxa"/><w:right w:w="110" w:type="dxa"/><w:top w:w="70" w:type="dxa"/><w:bottom w:w="70" w:type="dxa"/></w:tcMar></w:tcPr><w:p><w:r><w:t xml:space="preserve">Data &amp; Observability</w:t></w:r></w:p></w:tc><w:tc><w:p><w:r><w:t xml:space="preserve">MariaDB, MySQL, PostgreSQL, Zabbix, Prometheus, Grafana, CloudWatch, backups, log rotation, monitoring, disaster recovery</w:t></w:r></w:p></w:tc></w:tr>
</w:tbl>
<w:p><w:pPr><w:pStyle w:val="Section"/></w:pPr><w:r><w:t xml:space="preserve">PROFESSIONAL EXPERIENCE</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Role"/></w:pPr><w:r><w:t xml:space="preserve">Senior System Administrator &amp; DevOps Engineer | National Incubation and Research Center (NIRC) | Nov 2018 – Present</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">Manage Linux and Windows production infrastructure across cloud, VPS, and dedicated servers for government, healthcare, education, CRM, NGO, and business applications.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">Build and maintain Jenkins and Git-based CI/CD pipelines for Nginx, Apache, Tomcat, Gunicorn, Django, React, Java, and Grails-based services.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">Operate 30+ municipal server environments and support 50+ domains with cPanel-managed hosting, backups, database administration, monitoring, log management, and service recovery.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">Provide production support for government and healthcare systems, including government portals, hospital systems, NOC operations, and digital-service infrastructure.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">Automate recurring operations with Bash, Python, and PowerShell, improving reliability, reducing manual tasks, and documenting recovery procedures for production readiness.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">Support virtualization, cloud operations, application availability, capacity planning, firewall policies, VPNs, VLANs, routing, and incident handling across critical services.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Role"/></w:pPr><w:r><w:t xml:space="preserve">BCA Faculty | Camad College, Gairigaun, Tinkune, Kathmandu | Sep 2026 – Present</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">Teach Bachelor of Computer Applications courses, applied computer applications, and practical IT concepts to support students with technical foundations and real-world learning.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">Facilitate learning in computing fundamentals, systems awareness, and application-oriented problem solving for modern IT education.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Section"/></w:pPr><w:r><w:t xml:space="preserve">SELECTED INFRASTRUCTURE DELIVERY</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">Government With People (GWP): Delivered and supported municipal digital-service infrastructure, hosting, operations, and reliability for citizen-facing systems.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">Hospital Management System (HMS): Supported healthcare hosting environments with database operations, monitoring, backups, and service continuity.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">Chief Minister Health Screening Program: Provided infrastructure support for a Bagmati Province healthcare screening initiative and related production operations.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">NIRC CRM: Managed deployment and infrastructure support for Django, Gunicorn, Nginx, and MariaDB services in a production CRM environment.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Bullet"/></w:pPr><w:r><w:t xml:space="preserve">Managed Hosting &amp; NOC Operations: Supported cPanel administration, FTP backups, CCTV, IP telephony, monitoring, alerting, and recovery across hosted environments.</w:t></w:r></w:p>
<w:p><w:pPr><w:pStyle w:val="Section"/></w:pPr><w:r><w:t xml:space="preserve">EDUCATION</w:t></w:r></w:p>
<w:tbl>
  <w:tr><w:tc><w:p><w:r><w:t xml:space="preserve">PRIST University</w:t></w:r></w:p></w:tc><w:tc><w:p><w:r><w:t xml:space="preserve">B.Tech (Computer Science) | 2014 – 2018</w:t></w:r></w:p></w:tc></w:tr>
  <w:tr><w:tc><w:p><w:r><w:t xml:space="preserve">Pyramid International Higher Secondary School</w:t></w:r></w:p></w:tc><w:tc><w:p><w:r><w:t xml:space="preserve">+2 Science | 2010 – 2012</w:t></w:r></w:p></w:tc></w:tr>
  <w:tr><w:tc><w:p><w:r><w:t xml:space="preserve">Shree Vidhyodaya Sishu Sadan Higher Secondary School</w:t></w:r></w:p></w:tc><w:tc><w:p><w:r><w:t xml:space="preserve">S.L.C. | 2010</w:t></w:r></w:p></w:tc></w:tr>
</w:tbl>
"@

$stylesXml = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:sz w:val="20"/><w:color w:val="1D3144"/></w:rPr></w:rPrDefault></w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:pPr><w:spacing w:after="70"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:rPr><w:b/><w:sz w:val="36"/><w:color w:val="102F4B"/></w:rPr><w:pPr><w:spacing w:after="10"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:rPr><w:b/><w:sz w:val="20"/><w:color w:val="1676B4"/></w:rPr><w:pPr><w:spacing w:after="20"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Contact"><w:name w:val="Contact"/><w:rPr><w:sz w:val="17"/><w:color w:val="405C73"/></w:rPr><w:pPr><w:spacing w:after="30"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Section"><w:name w:val="Section"/><w:rPr><w:b/><w:sz w:val="21"/><w:color w:val="102F4B"/></w:rPr><w:pPr><w:spacing w:before="130" w:after="10"/><w:pBdr><w:bottom w:val="single" w:sz="10" w:color="5BA7D9" w:space="2"/></w:pBdr></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Role"><w:name w:val="Role"/><w:rPr><w:b/><w:sz w:val="20"/><w:color w:val="102F4B"/></w:rPr><w:pPr><w:spacing w:before="50" w:after="10"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Bullet"><w:name w:val="Bullet"/><w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr><w:spacing w:after="10"/></w:pPr></w:style>
</w:styles>
'@

$numberingXml = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:abstractNum w:abstractNumId="0">
    <w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/><w:lvlJc w:val="left"/><w:pPr><w:tabs><w:tab w:val="num" w:pos="360"/></w:tabs><w:ind w:left="360" w:hanging="180"/></w:pPr></w:lvl>
  </w:abstractNum>
  <w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>
</w:numbering>
'@

$documentXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    $documentBody
    <w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="720" w:right="790" w:bottom="720" w:left="790"/></w:sectPr>
  </w:body>
</w:document>
"@

$entries = [ordered]@{
  '[Content_Types].xml' = @'
<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
</Types>
'@
  '_rels/.rels' = @'
<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>
'@
  'word/_rels/document.xml.rels' = @'
<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
  <Relationship Id="rIdPhone" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="tel:+9779807903926" TargetMode="External"/>
  <Relationship Id="rIdMail" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="mailto:thebhuone@gmail.com" TargetMode="External"/>
  <Relationship Id="rIdLinkedIn" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="https://www.linkedin.com/in/bhuone99/" TargetMode="External"/>
  <Relationship Id="rIdPortfolio" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="https://bhuwanbhandari.com/" TargetMode="External"/>
</Relationships>
'@
  'word/document.xml' = $documentXml
  'word/styles.xml' = $stylesXml
  'word/numbering.xml' = $numberingXml
}

if (Test-Path $out) { Remove-Item -LiteralPath $out -Force }
$zip = [System.IO.Compression.ZipFile]::Open($out, [System.IO.Compression.ZipArchiveMode]::Create)
try {
  foreach ($pair in $entries.GetEnumerator()) {
    $entry = $zip.CreateEntry($pair.Key)
    $writer = New-Object System.IO.StreamWriter($entry.Open())
    $writer.Write($pair.Value)
    $writer.Dispose()
  }
}
finally {
  $zip.Dispose()
}

Get-Item $out | Select-Object Name, Length, LastWriteTime
