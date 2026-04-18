import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      email,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      nationality,
      ethnicity,
      countryOfResidence,
      currentCountry,
      mobile,
      primaryLanguage,
      otherLanguage,
      role,
      notes,
      instagramUrl,
      showreelUrl,
      photos, // Array of base64 strings
    } = body;

    // Validate required fields
    if (!email || !firstName || !lastName || !mobile || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await prisma.application.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An application with this email already exists" },
        { status: 409 }
      );
    }

    // Create application
    const application = await prisma.application.create({
      data: {
        email,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        nationality,
        ethnicity,
        countryOfResidence,
        currentCountry,
        mobile,
        primaryLanguage,
        otherLanguage,
        role,
        notes,
        instagramUrl,
        showreelUrl,
        photos: photos || [],
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: application.id,
        message: "Application received successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Apply API error:", error);
    return NextResponse.json(
      { error: "Failed to process application" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!isAdminAuthenticated(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applications = await prisma.application.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Get applications error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch applications";
    
    if (errorMessage.includes("connect ECONNREFUSED") || errorMessage.includes("ENOTFOUND")) {
      return NextResponse.json(
        { error: "Database connection failed. Check DATABASE_URL in .env.local" },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
